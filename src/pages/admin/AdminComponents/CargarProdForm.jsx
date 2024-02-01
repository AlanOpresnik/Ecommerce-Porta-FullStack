import axios from "axios";
import React, { useState } from "react";

import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";
import { Checkbox } from "@mui/material";

const CargarProdForm = () => {
  const [file, setFile] = useState(null);
  const [formDatasi, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    color: "",
    stock: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    enabled: true,
    subcategoryId: "",
    featured: false,
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formDatasi,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    console.log(file);
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("images", file);
      formData.append("name", formDatasi.name);
      formData.append("description", formDatasi.description);
      formData.append("price", formDatasi.price);
      formData.append("category", formDatasi.category);
      formData.append("color", formDatasi.color);
      formData.append("stock", formDatasi.stock);
      formData.append("createdAt", formDatasi.createdAt);
      formData.append("updatedAt", formDatasi.updatedAt);
      formData.append("enabled", formDatasi.enabled);
      formData.append("featured", formDatasi.featured);
      formData.append("subcategoryId", "65af49766b738bed2caf5573");
      



      const response = await axios.post(
        "https://www.portaflex.com.ar/api/products/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Respuesta:", response);
      setFormData({
        name: "",
        description: "",
        price: 0,
        category: "",
        color: "",
        stock: true,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        enabled: true,
        featured: false,
        subcategoryId: ""
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <form
      method="post"
      encType="multipart/form-data"
      className="mt-24"
      onSubmit={handleSubmit}
    >
      <input
        name="name"
        placeholder="Nombre producto"
        autoComplete="Nombre"
        value={formDatasi.name}
        onChange={handleChange}
      />
      <input
        name="description"
        placeholder="descripcion producto"
        autoComplete="descripcion"
        value={formDatasi.description}
        onChange={handleChange}
      />
      <input
        name="color"
        placeholder="color producto"
        autoComplete="color"
        value={formDatasi.color}
        onChange={handleChange}
      />
      <input
        name="price"
        placeholder="precio producto"
        autoComplete="precio"
        type="number"
        value={formDatasi.price}
        onChange={handleChange}
      />
      <input
        name="category"
        placeholder="categoria producto"
        autoComplete="category"
        value={formDatasi.category}
        onChange={handleChange}
      />
  <span>stock</span>
      <input
        type="checkbox"
        name="stock"
        checked={formDatasi.stock}
        onChange={handleChange}
      />
      <span>enabled</span>
      <input
        type="checkbox"
        name="enabled"
        checked={formDatasi.enabled}
        onChange={handleChange}
      />
       <span>featured</span>
      <input
        type="checkbox"
        name="featured"
        checked={formDatasi.featured}
        onChange={handleChange}
      />
      <input type="file" name="images" onChange={handleFileChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CargarProdForm;
