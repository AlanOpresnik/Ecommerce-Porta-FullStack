import React, { useEffect, useState } from 'react';
import { useProducts } from "../../../context/ProductsContext";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Button, Tooltip, Modal, Backdrop, Fade, TextField, Grid, InputLabel, Select, MenuItem, TextareaAutosize } from "@mui/material";
import axios from "axios";
import { Navigate, useNavigate, useRouteLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { Textarea } from '@material-tailwind/react';
import formatProductName from '../../../helpers/formatProductName';

const ProdAdminCard = ({ prod }) => {
    const navigate = useNavigate();
    const { removeProduct, categorys, fetchProducts , getSubCategory } = useProducts();
    const [openModal, setOpenModal] = useState(false);
    const [editedProduct, setEditedProduct] = useState(prod);
    const [imagePreviews, setImagePreviews] = useState(prod.images);
    const token = localStorage.getItem('token').replace(/['"]+/g, '');
    console.log(token)

    useEffect(() => {
        getSubCategory()
        
      }, [])

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;
        setEditedProduct({
            ...editedProduct,
            [name]: newValue,
        });
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files); // Convertir FileList a un array
        const localPreviews = files.map((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            return new Promise((resolve) => {
                reader.onload = () => resolve(reader.result);
            });
        });

        // Esperar a que se generen todas las vistas previas
        Promise.all(localPreviews).then((previews) => {
            setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
            // Almacenar archivos en el estado para enviarlos luego
            setEditedProduct((prev) => ({
                ...prev,
                images: [...prev.images, ...files], // Guardar archivos en el estado (para subirlos luego)
            }));
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Primero, enviar los datos del producto (sin las imágenes)
            await axios.put(`https://portaflex.com.ar/api/products/update`, {
                productId: editedProduct._id,
                name: editedProduct.name,
                description: editedProduct.description,
                price: editedProduct.price,
                subcategoryId: editedProduct.subcategoryId,
                stock: editedProduct.stock,
                featured: editedProduct.featured,
                enabled: editedProduct.enabled,
                createdAt: editedProduct.createdAt,
                updatedAt: editedProduct.updatedAt,
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

            // Subir imágenes solo si hay nuevas imágenes
            if (editedProduct.images.length > 0) {
                const formData = new FormData();
                formData.append('productId', editedProduct._id);

                // Agregar los archivos de imagen al FormData
                editedProduct.images.forEach((file) => {
                    formData.append('images', file);
                });

                // Subir las imágenes
                const response = await axios.put(
                    `https://portaflex.com.ar/api/products/updateImage`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );

                console.log('Respuesta del servidor:', response.data);

                const newImages = response.data.images;
               

                // Actualizar imágenes en el producto con la respuesta del servidor
                setEditedProduct((prev) => ({
                    ...prev,
                    images: [...prev.images, ...newImages], // Agregar imágenes nuevas
                }));

                // Sincronizar vistas previas con las imágenes del servidor
                setImagePreviews((prevPreviews) => [
                    ...prevPreviews.slice(0, prevPreviews.length - editedProduct.images.length), // Eliminar vistas previas locales
                    ...newImages.map((img) => img.secure_url), // Agregar URLs del servidor
                ]);
            }

            setOpenModal(false);
            fetchProducts();
            // Aquí puedes agregar alguna lógica adicional, como mostrar una notificación de éxito
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            // Aquí puedes mostrar una notificación de error si la actualización falla
        }
    };

    const handleImageDelete = async (imageId) => {
        try {
            const response = await axios.delete(`https://portaflex.com.ar/api/products/deleteImage`, {
                data: {
                    productId: prod._id,
                    imageId: imageId,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Imagen eliminada:', response.data);

            // Actualizar el estado de las imágenes en tiempo real
            setEditedProduct((prev) => ({
                ...prev,
                images: prev.images.filter((img) => img.public_id !== imageId),
            }));

            setImagePreviews((prevPreviews) =>
                prevPreviews.filter((preview) =>
                    editedProduct.images.some((img) => img.secure_url === preview.secure_url && img.public_id !== imageId)
                )
            );
        } catch (error) {
            console.error('Error al eliminar imagen:', error);
        }
    };


    return (
        <div className="flex justify-between border shadow-md p-2 rounded-xl gap-6 overflow-x-auto max-w-[600px]">
            <div>
                <img
                    className="w-[160px] h-[100px] object-cover rounded-lg "
                    src={prod.images.length === 0 ? 'no-image.jpg' : prod.images[0].secure_url}
                    alt={`Product ${prod._id}`}
                />
            </div>
            <div className="flex w-full flex-col items-center lg:flex-row lg:items-start">
                <div className='w-full'>
                    <p className="text-lg font-bold">{prod.name}</p>
                    <p className="text-sm text-gray-500 max-w-[220px] line-clamp-2">
                        {prod.description}
                    </p>
                    <p className="text-2xl text-[#C7B297]">
                        {" $"}
                        {prod.price}
                    </p>
                </div>
                <div className="flex mt-2 lg:mt-0">
                    <Tooltip title="Editar" arrow>
                        <Button onClick={handleOpenModal}>
                            <ModeEditIcon />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Eliminar" arrow>
                        <Button onClick={() => removeProduct(prod)}>
                            <DeleteIcon sx={{ color: "red" }} />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Ver Producto" arrow>
                        <Button onClick={() => navigate(`/products/${prod.subcategoryId.category}/${formatProductName(prod.subcategoryId.name)}/${formatProductName(prod.name)}/${prod._id}`)} >
                            <OpenInNewIcon sx={{ color: "#C7B297" }} />
                        </Button>
                    </Tooltip>
                </div>
            </div>

            {/* Modal de edición */}
            <Modal
                open={openModal}
                sx={{ zIndex: 1000, display: "flex", justifyContent: "center", alignItems: "center", }}
                onClose={handleCloseModal}
                closeAfterTransition

            >
                <Fade in={openModal}>
                    <div className="modal-container w-auto md:w-full">
                        <div className="modal-content bg-white rounded shadow p-4 max-w-md w-full mx-auto">
                            <h2 className="text-lg font-semibold mb-4">Editar Producto</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <TextField
                                        fullWidth
                                        label="Nombre"
                                        name="name"
                                        value={editedProduct.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-4 w-full">
                                    <p>Descripción</p>
                                    <TextareaAutosize minRows={5}

                                        fullWidth
                                        label="Descripción"
                                        name="description"
                                        className='w-full border p-2 rounded text-sm'
                                        value={editedProduct.description}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <TextField
                                        fullWidth
                                        label="Precio"
                                        name="price"
                                        type="number"
                                        value={editedProduct.price}
                                        onChange={handleChange}
                                    />
                                </div>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Color producto"
                                        variant="outlined"
                                        name="color"
                                        value={editedProduct.color}
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
                                        value={editedProduct.subcategoryId}
                                        sx={{ marginBottom: "1rem" }}
                                        label="Elegir categoria"
                                        onChange={handleChange}
                                    >
                                        {categorys?.map((category => (
                                            <MenuItem value={category._id}>{category.name} {`(`}{category.category}{`)`}</MenuItem>
                                        )))}
                                    </Select>
                                </Grid>
                                <Grid sx={{ marginBottom: ".5rem" }} item xs={12}>
                                    <label>
                                        Stock
                                        <input
                                            type="checkbox"
                                            name="stock"
                                            checked={editedProduct.stock}
                                            onChange={handleChange}
                                        />
                                    </label>
                                </Grid>
                                <Grid sx={{ marginBottom: ".5rem" }} item xs={12}>
                                    <label>
                                        Habilitado
                                        <input
                                            type="checkbox"
                                            name="enabled"
                                            checked={editedProduct.enabled}
                                            onChange={handleChange}
                                        />
                                    </label>
                                </Grid>
                                <Grid sx={{ marginBottom: ".5rem" }} item xs={12}>
                                    <label>
                                        Destacado
                                        <input
                                            type="checkbox"
                                            name="featured"
                                            checked={editedProduct.featured}
                                            onChange={handleChange}
                                        />
                                    </label>
                                </Grid>
                                <Grid sx={{ marginBottom: "1rem" }} item xs={12}>
                                    <div className="flex flex-col w-full gap-2 mt-4">
                                        {/* Input de carga de imágenes */}
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            className="flex flex-col"
                                            onChange={handleImageUpload} // Pasa el evento correctamente
                                        />
                                        {/* Previsualización de imágenes */}
                                        <div className="flex gap-4 mt-4">
                                            {imagePreviews.map((preview, index) => (
                                                <div key={index} className="relative hover:opacity-80">
                                                    <img
                                                        src={preview.secure_url ? preview.secure_url : preview} // 'preview' es la URL de la imagen
                                                        alt={`Preview ${index}`}
                                                        className="w-[100px] h-[120px] object-cover rounded"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleImageDelete(editedProduct.images[index].public_id)}
                                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Grid>
                                {/* Agregar más campos de edición si es necesario */}
                                <div className="flex flex-row-reverse justify-start gap-2 mt-6">
                                    <Button sx={{
                                        backgroundColor: "transparent",
                                        color: "red",
                                        borderColor: "red"
                                    }} variant="outlined" onClick={handleCloseModal} className="mr-2">Cancelar</Button>
                                    <Button sx={{
                                        backgroundColor: "#C7B297",
                                        color: "white",
                                        "&:hover": {
                                            backgroundColor: "#C7B297",
                                            color: "white",
                                        },
                                    }} variant="contained" color="primary" onClick={() => setOpenModal(false)} type="submit">Guardar Cambios</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};

export default ProdAdminCard;