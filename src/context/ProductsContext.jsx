import React, { createContext, useContext, useEffect, useState } from "react";
import prod2 from "../assets/img/prod2.jpeg";
import prod3 from "../assets/img/prod3.jpeg";
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
  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
  const precioFinal = subtotal - descuento

  const [orden, setOrden] = useState("lowToHigh");

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
        toast.success(`Producto: ${product.name} agregado con éxito`);
        console.log('Producto agregado con éxito', product);
      } else {
        toast.error(`El producto ya se encuentra en el carrito`);
      }
    }
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
      title: "Estas seguro?",
      html: `Deseas eliminar el producto:<p style='color: #aa9377'> ${product.name}</p>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete("https://portaflex.com.ar/api/products/delete", {
            data: {
              productId: product._id
            }
          });
          fetchProducts()
        } catch (error) {
          console.error("Error al eliminar el producto:", error);
        }
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
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
      const response = await axios.get(`https://portaflex.com.ar/api/sales/get`)
      setOrdenes(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

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
      const response = await axios.post(`https://portaflex.com.ar/api/subcategories/create`, {
        name: name,
        category: category,
        enabled: enabled
      })
      getSubCategory()
      console.log("respuesta:" + response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getCoupons = async () => {
    try {
      const response = await axios.get(`https://portaflex.com.ar/api/coupons/get`)
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
          couponId: id
        },
      });
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
        }
      })
      getCp()
      console.log(response)
    } catch (error) {

      console.log(error);
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
        ordenById
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
