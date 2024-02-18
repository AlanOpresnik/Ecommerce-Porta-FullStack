import React, { createContext, useContext, useEffect, useState } from "react";
import prod2 from "../assets/img/prod2.jpeg";
import prod3 from "../assets/img/prod3.jpeg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

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


  const [orden, setOrden] = useState("lowToHigh");

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://www.portaflex.com.ar/api/products/get');
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

  const handleRedirect = (id, category, formattedProductName) => {
    setId(id);
    navigate(`/products/${category}/${formattedProductName}/${id}`);

    console.log(id);
  };

  const addToCart = (product) => {
    if (product) {
      // Añadir la propiedad 'quantity' al producto
      product.quantity = 1;

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
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const removeProduct = async (product) => {
    try {
      const response = await axios.delete("https://www.portaflex.com.ar/api/products/delete", {
        data: {
          productId: product._id
        }
      });
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
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
      const response = await axios.get(`https://www.portaflex.com.ar/api/sales/get`)
      setOrdenes(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getOrdenes()
  }, [])


  const getSubCategory = async () => {
    const response = await axios.get(`https://www.portaflex.com.ar/api/subcategories/get`)
    setCategorys(response.data)
  }

  useEffect(() => {
    getSubCategory()
  }, [])

  const NewSubCategory = async (name, category, enabled) => {
    const response = await axios.post(`https://www.portaflex.com.ar/api/subcategories/create`, {
      name: name,
      category: category,
      enabled: enabled
    })
    console.log("respuesta:" + response.data)
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
        cartItems,
        removeFromCart,
        clearCart,
        removeProduct,
        getOrdenes,
        ordenes,
        categorys,
        NewSubCategory
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
