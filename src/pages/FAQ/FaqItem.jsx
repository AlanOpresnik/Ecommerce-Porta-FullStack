import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Button, Fade, Input, MenuItem, Modal, Select } from '@mui/material';
import { useProducts } from '../../context/ProductsContext';
import { Textarea } from '@nextui-org/react';
import axios from 'axios';
import toast from 'react-hot-toast';

const FaqItem = ({ faq }) => {
    const { getFaq,removeFaq } = useProducts()
    const [openModal, setOpenModal] = useState(false);
    const [editedFaq, setEditedFaq] = useState(faq);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;
        setEditedFaq({
            ...editedFaq,
            [name]: newValue,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(editedFaq);
        try {
            // Enviar los cambios al servidor
            await axios.put(`https://portaflex.com.ar/api/faq/update`, {
                _id: editedFaq._id,
                question: editedFaq.question,
                answer: editedFaq.answer,
            });
            handleCloseModal();
            getFaq();
            toast.success('Pregunta actualizada correctamente')
            // Aquí puedes agregar alguna lógica adicional, como mostrar una notificación de éxito
        } catch (error) {
            console.error("Error al actualizar la pregunta:", error);
            toast.error('Hubo un error al actualizar la pregunta')
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };
    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ArrowDownwardIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <div className='flex justify-between w-full'>
                        <p className='font-semibold'>{faq.question}</p>
                        <div className=' flex items-center md:flex-row  right-0 top-[-5px]'>

                            <Button onClick={handleOpenModal}><ModeEditIcon /></Button>
                            <Button onClick={() => removeFaq(faq._id)} color='error' sx={{ marginRight: "14px" }}><DeleteIcon /></Button>
                        </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <p>
                        {faq.answer}
                    </p>
                </AccordionDetails>
            </Accordion>
            <Modal sx={{
                zIndex: 1000,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }} open={openModal} onClose={handleCloseModal} closeAfterTransition>
                <Fade in={openModal}>
                    <div className="modal-container w-auto md:w-full">
                        <div className="modal-content bg-white rounded shadow p-4 max-w-md w-full mx-auto">
                            <h2 className="text-lg font-semibold mb-4">Editar Pregunta</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <p className='mb-1 text-sm '>Pregunta</p>
                                    <Input
                                    className='w-full'
                                        value={editedFaq.question}
                                        name='question'
                                        onChange={handleChange}
                                        placeholder='editar pregunta' />
                                </div>
                                <div className="mb-4 w-full">
                                <p className='mb-2 text-sm '>Respuesta</p>
                                    <Textarea
                                    className='w-full'
                                        value={editedFaq.answer}
                                        name='answer'
                                        onChange={handleChange}
                                        placeholder='editar respuesta' />
                                </div>
                                {/* Agregar más campos de edición si es necesario */}
                                <div className="flex flex-row-reverse justify-start gap-2 mt-6">
                                    <Button
                                        variant="outlined"
                                        onClick={handleCloseModal}
                                        className="mr-2"
                                    >
                                        Cancelar
                                    </Button>
                                    <Button variant="contained" color="primary" type="submit">
                                        Guardar Cambios
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default FaqItem