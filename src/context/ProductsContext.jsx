import React, { createContext, useContext, useEffect, useState } from "react";
import prod2 from "../assets/img/prod2.jpeg";
import prod3 from "../assets/img/prod3.jpeg";

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [sortingOption, setSortingOption] = useState(null);
  const [prodItems, setProdItems] = useState([
    {
      id: 1,
      img: prod2,
      title: "Silla para casa con tremendo color blanco",
      price: 125000,
    },
    {
      id: 2,
      img: prod3,
      title: "Silla para casa con tremendo color blanco",
      price: 125000,
    },
    {
      id: 3,
      img: prod3,
      title: "Silla para casa con tremendo color blanco",
      price: 125000,
    },
    {
      id: 4,
      img: prod2,
      title: "Silla para casa con tremendo color blanco",
      price: 25000,
    },
    {
      id: 5,
      img: prod3,
      title: "Silla para casa con tremendo color blanco",
      price: 125000,
    },
    {
      id: 6,
      img: prod3,
      title: "Silla para casa con tremendo color blanco",
      price: 125000,
    },
    {
      id: 7,
      img: prod2,
      title: "Silla para casa con tremendo color blanco",
      price: 125000,
    },
  ]);
  const [orden, setOrden] = useState("lowToHigh");
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

  return (
    <ProductsContext.Provider
      value={{
        handleOrdenChange,
        prodItems,
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
