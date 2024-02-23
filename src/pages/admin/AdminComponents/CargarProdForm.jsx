import { Grid, TextField, Typography, Button, Container, InputLabel, Select, MenuItem, Modal, Fade } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { useProducts } from "../../../context/ProductsContext";

const CargarProdForm = () => {
  const [fileInput, setFileInput] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const { categorys, NewSubCategory,fetchProducts } = useProducts()
  const [category, setCategory] = useState('')
  const [name, setName] = useState('')
  const [enabled, setEnabled] = useState(true)
  const [formDatasi, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    subcategoryId: "",
    color: "",
    stock: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    enabled: true,
    featured: false,
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
      formData.append("color", formDatasi.color);
      formData.append("stock", formDatasi.stock);
      formData.append("createdAt", formDatasi.createdAt);
      formData.append("updatedAt", formDatasi.updatedAt);
      formData.append("enabled", formDatasi.enabled);
      formData.append("featured", formDatasi.featured);
      formData.append("subcategoryId", formDatasi.subcategoryId);
      console.log(formDatasi)
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
      fetchProducts()
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <Container maxWidth="sm" className="mt-12">
        <h3 className="text-center font-bold mb-12 border-b">SUBIR NUEVO PRODUCTO</h3>
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
                className="w-[60vw] sm:w-full"
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
                className="w-[60vw] sm:w-full"
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
                className="w-[60vw] sm:w-full"
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
                className="w-[60vw] sm:w-full"
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="demo-simple-select-label">Elegir categoria</InputLabel>
              <Select
                fullWidth
                labelId="category"
                name="subcategoryId"
                id="category select"
                value={formDatasi.subcategoryId}
                label="Elegir categoria"

                onChange={handleChange}
              >
                {categorys?.map((category => (
                  <MenuItem value={category._id}>{category.name} {`(`}{category.category}{`)`}</MenuItem>
                )))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Button
                label="Crear nueva categoria"
                variant="outlined"
                type="button"
                className="w-[60vw] sm:w-auto"
                onClick={() => setOpenModal(true)}
              >
                Crear nueva categoria
              </Button>

            
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
                className="w-[60vw] sm:w-full"
              />

            </Grid>

            {/* Previsualización de imágenes */}
            <div className="flex gap-6 ml-3 mt-2 overflow-y-hidden">
              {imagePreviews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Preview ${index}`}
                  className="w-[100px] h-[120px] md:max-w-[120px] flex"
                />
              ))}
            </div>
          </Grid>
          <Button
            className="w-[100%] mt-6 bg-[#cdc3b5] hover:bg-[#d4c4af]"
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#C7B297",
              color: "white",
              border: "none",
              ":hover": {
                backgroundColor: "#b7a084",
                border: "none",
              }
            }}
            type="submit"
          >
            Subir
          </Button>
        </form>
        <Modal
                open={openModal}
                sx={{ zIndex: 1000, display: "flex", justifyContent: "center", alignItems: "center", }}
                onClose={() => setOpenModal(false)}
                closeAfterTransition

              >
                <Fade in={openModal}>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (name.trim() === '' || category.trim() === '') {
                      // Si el nombre o la categoría están vacíos, no se envía el formulario
                      return;
                    }
                    NewSubCategory(name, category, enabled);
                  }}>
                    <div className=" w-auto md:w-[500px]">
                      <div className="modal-content bg-white rounded shadow p-4 max-w-md w-full mx-auto">
                        <h2 className="text-lg font-semibold mb-4">Nueva Subcategoria</h2>

                        <TextField
                          fullWidth
                          label="Nombre de la nueva Subcategoria"
                          variant="outlined"
                          type="text"
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-[60vw] sm:w-full"

                        />
                        <Grid sx={{ marginTop: "1rem" }} item xs={12}>
                          <InputLabel id="demo-simple-select-label">Seccion donde aparecera</InputLabel>
                          <Select
                            fullWidth
                            labelId="category"
                            name="category"
                            id="category select"
                            sx={{ marginBottom: "1rem" }}
                            label="Elegir categoria"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            <MenuItem value={"construccion"}>{"construccion"}</MenuItem>
                            <MenuItem value={"hogar"}>{"hogar"}</MenuItem>
                          </Select>
                        </Grid>
                        <Grid item xs={12}>
                          <label>
                            Habilitado
                            <input
                              type="checkbox"
                              name="enabled"
                              className="mb-6"
                              onChange={(e) => setEnabled(e.target.checked)}
                              value={enabled}
                            />
                          </label>
                        </Grid>
                        <Button
                          fullWidth
                          sx={{
                            backgroundColor: "#C7B297",
                            color: "white",
                            border: "none",
                            ":hover": {
                              backgroundColor: "#b7a084",
                              border: "none",
                            }
                          }}
                          label="Crear nueva categoria"
                          variant="outlined"
                          type="submit"
                          className="w-[60vw] sm:w-auto">
                          Crear
                        </Button>
                      </div>
                    </div>
                  </form>
                </Fade>
              </Modal>
      </Container>
    </>
  );
};

export default CargarProdForm;