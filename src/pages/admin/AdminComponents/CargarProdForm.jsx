import { Grid, TextField, Typography,Button, Container } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const CargarProdForm = () => {
  const [fileInput, setFileInput] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
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
    featured: false,
    subcategoryId: "",
  });

  

  const handleFileChange = (e) => {
    const files = e.target.files;

    // Leer y mostrar previsualizaciones de imágenes
    const previews = Array.from(files).map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImagePreviews((prevPreviews) => [...prevPreviews, reader.result]);
      };
      return reader;
    });

    setFileInput(files);
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
    e.preventDefault();
    if (imagePreviews.length === 0) {
      return Swal.fire({
        icon: "error",
        title: "Porfavor seleccione una imagen",
        text: "Es nesecario una imagen valida para subir el producto",
        footer: 'si seguis teniendo este problema contactate con @alan_opk',
      });
    }
    let timerInterval;
    Swal.fire({
      title: "Su producto se esta subiendo",
      html: "Este cartel se cerrara en <b></b> milisegundos .",
      timer: 10000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
     
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });

    try {
      const formData = new FormData();
      for (let i = 0; i < fileInput.length; i++) {
        formData.append("images", fileInput[i]);
      }
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
        subcategoryId: "",
      });
      setFileInput(null)
      setImagePreviews([])
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <Container maxWidth="sm" className="mt-24">
      <div className="mb-4 border-b w-[100px] md:w-full md:mb-2">
        <Typography className="font-bold text-md" variant="body4">
          Cargar Producto
        </Typography>
      </div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre producto"
              variant="outlined"
              name="name"
              value={formDatasi.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descripción producto"
              variant="outlined"
              name="description"
              value={formDatasi.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Color producto"
              variant="outlined"
              name="color"
              value={formDatasi.color}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Precio producto"
              variant="outlined"
              type="number"
              name="price"
              value={formDatasi.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Categoría producto"
              variant="outlined"
              name="category"
              value={formDatasi.category}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <label>
              Stock
              <input
                type="checkbox"
                name="stock"
                checked={formDatasi.stock}
                onChange={handleChange}
              />
            </label>
          </Grid>
          <Grid item xs={12}>
            <label>
              Habilitado
              <input
                type="checkbox"
                name="enabled"
                checked={formDatasi.enabled}
                onChange={handleChange}
              />
            </label>
          </Grid>
          <Grid item xs={12}>
            <label>
              Destacado
              <input
                type="checkbox"
                name="featured"
                checked={formDatasi.featured}
                onChange={handleChange}
              />
            </label>
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />
          </Grid>
               {/* Previsualización de imágenes */}
               <div className="flex gap-6">
            {imagePreviews.map((preview, index) => (
              <img 
              key={index}
                src={preview}
                alt={`Preview ${index}`}
                className="max-w-[120px] flex"
              />
            ))}
          </div>
        </Grid>
        <Button
          className="mt-6 bg-[#cdc3b5] hover:bg-[#d4c4af]"
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
        >
          Enviar
        </Button>
      </form>
    </Container>
  );
};

export default CargarProdForm;