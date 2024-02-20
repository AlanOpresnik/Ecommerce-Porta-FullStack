import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { Chip, Typography } from '@mui/material';
import { useProducts } from '../../../context/ProductsContext';
import { formatearFecha } from './formatearFecha';


export default function OrdenesItem({orden}) {
    const { ordenes } = useProducts()



    return (

        <div className='max-w-[620px] shadow-md   px-3 '>
                <Accordion className='my-6 relative w-[95%] md:w-full justify-between'>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        className='justify-between flex'
                    >
                        <div className='w-[200px] md:w-full block md:flex justify-between'>
                            <Typography className='text-sm w-[100px]' variant="body1">{formatearFecha(orden.orderDate)}</Typography>
                            <Typography className='text-xs font-extrabold md:text-medium' variant="body1">{orden.name}, Orden #{orden._id}</Typography>
                            <div>
                                <Chip
                                    size='small'
                                    className='px-0'
                                    label={orden.paymentStatus}
                                    color={orden.paymentStatus === 'Aprobado' ? 'success' : 'error'}
                                    variant={orden.paymentStatus === "Aprobado" ? 'contained' : 'outlined'}
                                />
                            </div>

                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className='flex flex-col gap-6  justify-center '>
                            <h4>Detalles de la orden:</h4>
                            <div>
                                <div className='flex  border-t py-4 items-center'>
                                    <p className='text-sm'>Nombre: {` `}</p><span className='text-sm font-semibold'> {orden.name}</span>
                                </div>
                                <div className='flex mt-3 border-t py-4'>
                                    <p className='text-xs'>Correo electronico: {` `}</p><span className='text-sm font-semibold'> {orden.email}</span>
                                </div>
                                <div className='flex mt-3 border-t py-4'>
                                    <p className='text-sm'>Numero de telefono: {` `}</p><span className='text-sm font-semibold'> {orden.tel}</span>
                                </div>
                                <div className='flex mt-3 border-t py-4'>
                                    <p className='text-sm'>DNI: {` `}</p><span className='text-sm font-semibold'> {orden.dni}</span>
                                </div>
                                <div className='flex mt-3 border-t py-4'>
                                    <p className='text-sm'>Metodo de pago: {` `}</p> <span className='text-sm font-semibold'> {orden.paymentMethod}</span>
                                </div>
                                <div className='flex mt-3 border-t py-4'>
                                    <p className='text-sm'>Metodo de envio: {` `}</p><span className='text-sm font-semibold'> {orden.shippingMethod}</span>
                                </div>
                                <div className='flex mt-3 border-t py-4'>
                                    <p className='text-sm'>Direccion de envio: {` `}</p><span className='text-sm font-semibold'> {orden.shippingAddress}</span>
                                </div>
                                <h4 className='font-bold text-xl mt-2'>Productos:</h4>
                                <div className='flex gap-5 flex-col mt-3 border-t py-4'>
                                    {orden.productList.map((product => (
                                        <div className='flex flex-col'>
                                            <p key={product._id} className='line-clamp-2 border-b py-2'>*{product.name}</p>
                                            <p>precio:{product.price}</p>
                                            <p>cantidad{product.quantity}</p>
                                        </div>
                                    )))}

                                    <h4>TOTAL${orden.total}</h4>
                                </div>
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>

        </div>

    );
}