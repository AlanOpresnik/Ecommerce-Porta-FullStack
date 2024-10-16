import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import Swal from "sweetalert2";

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [sortingOption, setSortingOption] = useState(null);
  const [id, setId] = useState();
  const navigate = useNavigate();
  const [prodItems, setProdItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [cartItems, setCartItems] = useState([])
  const [ordenes, setOrdenes] = useState([])
  const [categorys, setCategorys] = useState()
  const [cuponData, setCuponData] = useState([])
  const [cuponDataDiscout, setCuponDataDiscount] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [coupons, setCoupons] = useState([]);
  const [cp, setCp] = useState([]);
  const [cupon, setCupon] = useState("");
  const [cuponInvalid, setCuponInvalid] = useState()
  const [descuento, setDescuento] = useState(0);
  const [ordenById, setOrdenById] = useState([])
  const [Faq, setFaq] = useState([])
  let token;
  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
  const precioFinal = subtotal - descuento
  const getToken = localStorage.getItem('token');

  if (getToken && getToken != "") {
    token = getToken.replace(/['"]+/g, '');
  }

  const [orden, setOrden] = useState("lowToHigh");

  console.log(token)
  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://portaflex.com.ar/api/products/get');
      setProdItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [])

  const handleOrdenChange = (valor) => {
    const nuevoOrden = valor === "$.0" ? "lowToHigh" : "highToLow";
    setOrden(nuevoOrden);

    const productosOrdenados = [...prodItems];

    if (nuevoOrden === "lowToHigh") {
      productosOrdenados.sort((a, b) => a.price - b.price);
    } else if (nuevoOrden === "highToLow") {
      productosOrdenados.sort((a, b) => b.price - a.price);
    }
    setProdItems(productosOrdenados);
  };

  const handleRedirect = (id, category, subcategory, formattedProductName) => {
    setId(id);
    navigate(`/products/${category}/${subcategory}/${formattedProductName}/${id}`);

    console.log(id);
  };

  const addToCart = (product) => {
    if (product) {
      product.quantity = 1; // Valor inicial de la cantidad al agregar el producto

      const isProductInCart = cartItems.some(item => item._id === product._id);
      if (!isProductInCart) {
        const updatedCartItems = [...cartItems, product];
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

        console.log('Producto agregado con éxito', product);
      } else {
        toast.error(`El producto ya se encuentra en el carrito`);
      }
    }
  };

  const isInCart = (productId) => {
    return cartItems.some((item) => item._id === productId);
  };


  const incrementQuantity = (prod) => {
    const updatedCartItems = cartItems.map(item => {
      if (item._id === prod._id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const decrementQuantity = (prod) => {
    const updatedCartItems = cartItems.map(item => {
      if (item._id === prod._id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const removeProduct = async (product) => {
    Swal.fire({
      title: "¿Estás seguro?",
      html: `Deseas eliminar el producto:<p style='color: #aa9377'> ${product.name}</p>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Enviar el productId como parámetro en la URL
          const response = await axios.delete(`https://portaflex.com.ar/api/products/delete`, {
            data: {
              productId: product._id,
            },
            headers: {
              Authorization: `Bearer ${token}`
            }
          },
          );


          fetchProducts(); // Actualiza la lista de productos
          Swal.fire({
            title: "Eliminado!",
            text: "El producto ha sido eliminado.",
            icon: "success",
          });
        } catch (error) {
          console.error("Error al eliminar el producto:", error);
          Swal.fire({
            title: "Error",
            text: "No se pudo eliminar el producto.",
            icon: "error",
          });
        }
      }
    });
  };

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter(item => item._id !== productId);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
    toast.success('El carrito ha sido vaciado');
  };


  const getOrdenes = async () => {
    try {

      const response = await axios.get(`https://portaflex.com.ar/api/sales/get`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      )
      setOrdenes(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(localStorage.getItem('token'));
  const getOrdenById = async (id) => {
    try {
      const response = await axios.post(`https://portaflex.com.ar/api/sales/getId`, {
        orderId: id
      })
      setOrdenById(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }

  }

  const getSubCategory = async () => {
    const response = await axios.get(`https://portaflex.com.ar/api/subcategories/get`)
    setCategorys(response.data)
  }

  useEffect(() => {
    getSubCategory()
  }, [])

  const NewSubCategory = async (name, category, enabled) => {
    try {
      const response = await axios.post(`https://portaflex.com.ar/api/subcategories/create`,
        {
          name: name,
          category: category,
          enabled: enabled
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      getSubCategory()
      console.log("respuesta:" + response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getCoupons = async () => {
    try {
      const response = await axios.get(`https://portaflex.com.ar/api/coupons/get`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setCoupons(response.data.data)
      console.log(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }


  const createCupon = async (key, value, expired) => {
    try {
      const response = await axios.post("https://portaflex.com.ar/api/coupons/create", {
        key: key,
        value: value,
        expired: expired,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      getCoupons()
      console.log("respuesta post cupon", response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const ValidateCupon = async (key) => {
    try {
      const response = await axios.post(`https://portaflex.com.ar/api/coupons/validate`, {
        key: key
      })
      setCuponData(response.data._id)
      console.log(response.data)
      setCuponDataDiscount(response.data)
      console.log(response)
      setCuponInvalid(false)
    } catch (error) {
      console.log(error)
      setCuponInvalid(true)
    }
  }

  const deleteCupon = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(`https://portaflex.com.ar/api/coupons/delete`, {
        data: {
          couponId: id,
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      },
      );
      getCoupons()


      console.log("respuesta:", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCp = async () => {
    try {
      const response = await axios.get(`https://portaflex.com.ar/api/cp/get`)
      setCp(response.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  const deleteCp = async (id) => {
    try {
      const response = await axios.delete(`https://portaflex.com.ar/api/cp/delete`, {
        data: {
          cpId: id
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      },
      )
      getCp()
      console.log(response)
    } catch (error) {

      console.log(error);
    }
  }

  const getFaq = async () => {
    try {
      const response = await axios.get(`https://www.portaflex.com.ar/api/faq/get`)
      setFaq(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const newFaq = async (question, answer) => {
    try {
      const response = await axios.post(`https://www.portaflex.com.ar/api/faq/create`, {
        question: question,
        answer: answer
      },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  const updateFaq = async (question, answer) => {
    try {
      const response = await axios.put(`https://www.portaflex.com.ar/api/faq/update`, {
        question: question,
        answer: answer
      },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  const removeFaq = async (id) => {
    Swal.fire({
      title: "Estas seguro?",
      html: `Deseas eliminar esta pregunta frecuente?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete("https://portaflex.com.ar/api/faq/delete", {
            data: {
              _id: id
            },
            headers: {
              Authorization: `Bearer ${token}`
            }
          },
          );
          getFaq()
        } catch (error) {
          console.error("Error al eliminar la pregunta:", error);
        }
        Swal.fire({
          title: "Pregunta eliminada!",
          text: "la pregunta fue eliminada correctamente.",
          icon: "success"
        });
      }
    });

  };

  const getCuotasCard = async (bin, amount) => {
    try {
      const response = await axios.post('https://portaflex.com.ar/api/mercadopago/getInstallments', {
        bin: bin,
        amount: amount
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <ProductsContext.Provider
      value={{
        handleOrdenChange,
        prodItems,
        handleRedirect,
        id,
        fetchProducts,
        loading,
        addToCart,
        setLoading,
        cartItems,
        removeFromCart,
        clearCart,
        removeProduct,
        getOrdenes,
        ordenes,
        categorys,
        NewSubCategory,
        ValidateCupon,
        cuponData,
        createCupon,
        getCoupons,
        coupons,
        deleteCupon,
        getCp,
        cp,
        cupon,
        setCupon,
        descuento,
        setDescuento,
        precioFinal,
        deleteCp,
        cuponInvalid,
        cuponDataDiscout,
        setQuantity,
        quantity,
        incrementQuantity,
        decrementQuantity,
        getOrdenById,
        ordenById,
        Faq,
        getFaq,
        newFaq,
        removeFaq,
        getCuotasCard,
        isInCart,
        updateFaq
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsContext, ProductsProvider };

export const useProducts = () => {
  return useContext(ProductsContext);
};
