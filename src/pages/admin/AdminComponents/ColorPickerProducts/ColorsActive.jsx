import React, { useEffect, useState } from 'react';
import { useProducts } from '../../../../context/ProductsContext';
import { Button, Fade, Modal, TextField, Tooltip, Grid } from '@mui/material';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

const ColorsActive = () => {
  const { colors, getColors, updateColor,deleteColor } = useProducts();
  const [openModal, setOpenModal] = useState(false);
  const [editedColor, setEditedColor] = useState({
    name: '',
    stock: false,
    hex: "",
  });

  useEffect(() => {
    getColors();
  }, []); // Asegúrate de incluir `getColors` como dependencia

  const handleOpenModal = (color) => {
    setEditedColor(color); // Setea el producto que se va a editar
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditedColor({ name: '', stock: false, hex: "" }); // Resetea el formulario al cerrar
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setEditedColor((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateColor(editedColor);
    handleCloseModal();
  };

  return (
    <div>
      <div>
        <p className='text-xl font-semibold text-center mt-12'>
          Colores actuales en Stock
        </p>
      </div>
      <div className='grid grid-cols-3 gap-5 mt-6'>
        {colors.length === 0 ? (
          <p>Cargando Colores...</p>
        ) : (
          colors.map((color) => (
            <div
              key={color._id}
              className='border p-4 flex items-center gap-6 w-fit rounded-lg relative shadow-md'
            >
              <div
                className='rounded-full min-w-[50px] shadow-md min-h-[50px] bg-red-500'
                style={{ backgroundColor: color.hex }}
              />
              <p className='text-sm text-center w-full font-semibold'>{color.name}</p>
              <div className=' right-0 flex'>
                <Tooltip title="Editar" arrow>
                  <Button onClick={() => handleOpenModal(color)}>
                    <ModeEditIcon className='!w-[20px] !h-[20px]' />
                  </Button>
                </Tooltip>
                <Tooltip title="Eliminar" arrow>
                  <Button onClick={() => deleteColor(color)}>
                    <DeleteIcon className='!w-[20px] !h-[20px]' sx={{ color: "red" }} />
                  </Button>
                </Tooltip>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal
        open={openModal}
        sx={{
          zIndex: 1000,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClose={handleCloseModal}
        closeAfterTransition
      >
        <Fade in={openModal}>
          <div className="modal-container w-auto md:w-full">
            <div className="modal-content bg-white rounded shadow p-4 max-w-md w-full mx-auto">
              <h2 className="text-lg font-semibold mb-4">Editar color</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <TextField
                    fullWidth
                    label="Nombre"
                    name="name"
                    value={editedColor.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <TextField
                    fullWidth
                    label="Hex"
                    name="hex"
                    value={editedColor.hex}
                    disabled
                    onChange={handleChange}
                  />
                </div>

                <Grid sx={{ marginBottom: ".5rem" }} item xs={12}>
                  <label>
                    Hay Stock de este color?
                    <input
                      type="checkbox"
                      name="enabled"
                      checked={editedColor.enabled}
                      onChange={handleChange}
                    />
                  </label>
                </Grid>

                <div className="flex flex-row-reverse justify-start gap-2 mt-6">
                  <Button
                    sx={{
                      backgroundColor: "transparent",
                      color: "red",
                      borderColor: "red",
                    }}
                    variant="outlined"
                    onClick={handleCloseModal}
                  >
                    Cancelar
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: "#C7B297",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#C7B297",
                        color: "white",
                      },
                    }}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Guardar Cambios
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ColorsActive;
