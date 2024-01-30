import React, { createContext, useContext, useEffect, useState } from "react";
import prod2 from "../assets/img/prod2.jpeg";
import prod3 from "../assets/img/prod3.jpeg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [sortingOption, setSortingOption] = useState(null);
  const [id, setId] = useState();
  const navigate = useNavigate();
  const [prodItems, setProdItems] = useState([
    {
      id: 1,
      img: prod2,
      title: "Silla para casa con tremendo color blanco",
      slug:
      "Silla-para-casa-con-tremendo-color-blanco",
      category: "Hogar",
      price: 125000,
    },
    {
      id: 2,
      img: prod3,
      title: "a",
      slug:
      "a",
      description:
        "Experimenta la perfecta fusión de estilo y comodidad con nuestra silla para hogar en un deslumbrante color blanco. Esta pieza exquisitamente diseñada no solo eleva la estética de cualquier espacio, sino que también proporciona un nivel excepcional de confort para tus momentos de descanso y convivencia.",
      category: "construccion",
      price: 125000,
    },
    {
      id: 3,
      img: prod3,
      title: "Silla para casa con tremendo color blanco",
      slug:
      "Silla-para-casa-con-tremendo-color-blanco",
      description:
        "Experimenta la perfecta fusión de estilo y comodidad con nuestra silla para hogar en un deslumbrante color blanco. Esta pieza exquisitamente diseñada no solo eleva la estética de cualquier espacio, sino que también proporciona un nivel excepcional de confort para tus momentos de descanso y convivencia.",
      category: "Hogar",
      price: 125000,
    },
    {
      id: 4,
      img: prod2,
      title: "Silla para casa con tremendo color blanco",
      description:
        "Experimenta la perfecta fusión de estilo y comodidad con nuestra silla para hogar en un deslumbrante color blanco. Esta pieza exquisitamente diseñada no solo eleva la estética de cualquier espacio, sino que también proporciona un nivel excepcional de confort para tus momentos de descanso y convivencia.",
      category: "Hogar",
      price: 25000,
    },
    {
      id: 5,
      img: prod3,
      title: "Silla para casa con tremendo color blanco",
      description:
        "Experimenta la perfecta fusión de estilo y comodidad con nuestra silla para hogar en un deslumbrante color blanco. Esta pieza exquisitamente diseñada no solo eleva la estética de cualquier espacio, sino que también proporciona un nivel excepcional de confort para tus momentos de descanso y convivencia.",
      category: "construccion",
      price: 125000,
    },
    {
      id: 6,
      img: prod3,
      title: "Silla para casa con tremendo color blanco",
      description:
        "Experimenta la perfecta fusión de estilo y comodidad con nuestra silla para hogar en un deslumbrante color blanco. Esta pieza exquisitamente diseñada no solo eleva la estética de cualquier espacio, sino que también proporciona un nivel excepcional de confort para tus momentos de descanso y convivencia.",
      category: "construccion",
      price: 125000,
    },
    {
      id: 7,
      img: prod2,
      title:
        "Silla para casa con tremendo color rojo Silla para casa con tremendo color rojo Silla para casa con tremendo color rojo",
        description:
        "Experimenta la perfecta fusión de estilo y comodidad con nuestra silla para hogar en un deslumbrante color blanco. Esta pieza exquisitamente diseñada no solo eleva la estética de cualquier espacio, sino que también proporciona un nivel excepcional de confort para tus momentos de descanso y convivencia.",
        category: "construccion",
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

  const handleRedirect = (id, category, formattedProductName) => {
    setId(id);
    navigate(`/products/${category}/${formattedProductName}/${id}`);

    console.log(id);
  };

  return (
    <ProductsContext.Provider
      value={{
        handleOrdenChange,
        prodItems,
        handleRedirect,
        id,
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
