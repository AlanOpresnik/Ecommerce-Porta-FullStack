import React, { useState } from 'react';
import { useProducts } from "../../../context/ProductsContext";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Button, Tooltip, Modal, Backdrop, Fade, TextField, Grid, InputLabel, Select, MenuItem, TextareaAutosize } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Textarea } from '@material-tailwind/react';

const ProdAdminCard = ({ prod }) => {
    const navigate = useNavigate();
    const { removeProduct, categorys } = useProducts();
    const [openModal, setOpenModal] = useState(false);
    const [editedProduct, setEditedProduct] = useState(prod);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({
            ...editedProduct,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Enviar los cambios al servidor
            await axios.put(`https://www.portaflex.com.ar/api/products/${prod._id}`, editedProduct);
            handleCloseModal();
            // Aquí puedes agregar alguna lógica adicional, como mostrar una notificación de éxito
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            // Aquí puedes mostrar una notificación de error si la actualización falla
        }
    };

    return (
        <div className="flex justify-between gap-6 overflow-x-auto max-w-[600px] ma">
            <div>
                <img
                    className="w-[160px] h-[100px] object-cover rounded"
                    src={import.meta.env.VITE_ENDPOINT_IMAGES + prod.images[0].filename}
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
                        <Button onClick={() => navigate(`/products/${prod.category}/${prod.name}/${prod._id}`)} >
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
                                    <input
                                        type="file"
                                        name="images"
                                        multiple
                                        accept="image/*"

                                        className="w-[60vw] sm:w-full"
                                    />
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
                                    }} variant="contained" color="primary" type="submit">Guardar Cambios</Button>
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