import React, { useState } from "react";
import { Grid, TextField, Button, Container, InputLabel, Select, MenuItem, Modal, Backdrop, Fade } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { useProducts } from "../../../context/ProductsContext";

const EditarProdModal = ({ open, handleClose, formData, handleChange, handleSubmit }) => {
    const { categorys } = useProducts();

    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <div className="modal">
                    <Container maxWidth="sm" className="mt-12">
                        <h3 className="text-center font-bold mb-12 border-b">EDITAR PRODUCTO</h3>
                        <div className="mb-4 border-b w-[100px] md:w-full md:mb-2">
                            {/* Formulario de edición de productos */}
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
                                    
                                </Grid>
                                {/* Botón de guardar */}
                                <Button className="w-[100%] mt-6 bg-[#cdc3b5] hover:bg-[#d4c4af]" variant="contained" color="primary" type="submit">
                                    Guardar
                                </Button>
                            </form>
                        </div>
                    </Container>
                </div>
            </Fade>
        </Modal>
    );
};

export default EditarProdModal