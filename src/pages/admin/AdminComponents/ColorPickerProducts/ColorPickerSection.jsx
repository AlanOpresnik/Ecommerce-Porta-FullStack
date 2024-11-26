import { Button, Fade, Grid, Modal, TextField } from '@mui/material';
import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { useProducts } from '../../../../context/ProductsContext';

const ColorPickerSection = () => {
  const [color, setColor] = useState('#8f6666'); // Estado inicial del color
  const [colorForm, setColorForm] = useState({ hex: '', name: '' });
  const [openModal, setOpenModal] = useState(false);
  const { createColor } = useProducts();

  const handleColorChange = (newColor) => {
    setColor(newColor.hex); // Actualiza el estado con el nuevo color
    setColorForm((prev) => ({ ...prev, hex: newColor.hex }));
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setColorForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="mt-12">
      <h2 className="text-xl text-center">Seleccionar colores en stock</h2>
      <p className="text-center text-sm">
        Puedes escribir tu color en HEXADECIMAL o seleccionarlo manualmente
      </p>
      <div className="mt-12 md:flex justify-center gap-12">
        <div className="flex justify-center">
          <SketchPicker color={color} onChange={handleColorChange} />
        </div>
        <div className="flex flex-col mt-6 md:mt-0 items-center">
          <p className="text-center">Color seleccionado: {color}</p>
          <div
            className="text-lg w-[160px] border h-[160px] text-center p-4 rounded-full mt-2"
            style={{ backgroundColor: color }}
          ></div>
          <TextField
            label="Nombre del color"
            variant="outlined"
            size="small"
            className="!mt-6"
            name="name"
            value={colorForm.name}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex justify-center mt-12">
        <Button onClick={handleOpenModal} className="!bg-[#C7B297] !text-white">
          Agregar Color nuevo
        </Button>
      </div>
      <Modal
        open={openModal}
        sx={{
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onClose={handleCloseModal}
        closeAfterTransition
      >
        <Fade in={openModal}>
          <div className="modal-container w-auto md:w-full">
            <div className="modal-content bg-white rounded shadow p-4 max-w-md w-full mx-auto">
              <h2 className="text-lg font-semibold mb-4">Subir nuevo color</h2>
              <div className="flex flex-col items-center">
                <p className="text-center">Color seleccionado: {colorForm.hex}</p>
                <p>Nombre del color: {colorForm.name}</p>
                <div
                  className="text-lg w-[160px] border h-[160px] text-center p-4 rounded-full mt-2"
                  style={{ backgroundColor: colorForm.hex }}
                ></div>
              </div>

              <div className="flex flex-row-reverse justify-start gap-2 mt-6">
                <Button
                  sx={{
                    backgroundColor: 'transparent',
                    color: 'red',
                    borderColor: 'red',
                  }}
                  variant="outlined"
                  onClick={handleCloseModal}
                >
                  Cancelar
                </Button>
                <Button
                  sx={{
                    backgroundColor: '#C7B297',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#C7B297',
                      color: 'white',
                    },
                  }}
                  variant="contained"
                  onClick={() => createColor(colorForm)}
                >
                  Guardar Cambios
                </Button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ColorPickerSection;
