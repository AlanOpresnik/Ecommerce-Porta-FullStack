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
import { useEffect } from 'react';
import { useState } from 'react';


export default function OrdenesItem({ orden }) {
    const { coupons, getCoupons } = useProducts();

    useEffect(() => {
        getCoupons()
    }, [])


    const buscarCuponPorId = (couponId) => {
        return coupons.find(coupon => coupon._id === couponId);
    };

    // Buscar el cupón correspondiente al couponId de la orden
    const cuponOrden = buscarCuponPorId(orden.couponId);
    return (

        <div className=' w-auto lg:w-[920px] shadow-md mt-6   px-3 '>
            <Accordion className='my-6 relative w-[95%] md:w-full justify-between'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    className='justify-between flex'
                >
                    <div className='w-[200px] md:w-full block md:flex justify-between'>
                        <div className='flex md:flex-col items-center'>
                            <p className='hidden md:block text-xs border-b'>Fecha de compra</p>
                            <Typography className='text-sm w-[100px]' variant="body1">{formatearFecha(orden.orderDate)}</Typography>
                        </div>
                        <div className='flex  md:flex-col items-center'>
                            <p className='text-xs hidden md:block border-b'>Nombre</p>
                            <p className='text-sm font-semibold md:text-medium'>{orden.name}</p>
                        </div>
                        <div className='flex md:flex-col items-center'>
                            <p className='text-xs hidden md:block border-b'>DNI del comprador</p>
                            <p className='text-sm md:text-medium font-semibold '>{orden.dni}</p>
                        </div>
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
                                <p className='text-sm '>Nombre: {` `}</p><span className='text-sm font-semibold'> {orden.name}</span>
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
                            <h4 className='font-bold text-xl mt-2'>Productos y descuentos</h4>
                            <div className='flex gap-5 flex-col mt-3 border-t py-4'>
                                {orden.productList.map((product => (
                                    <div key={product._id} className='flex flex-col border p-4 rounded-lg shadow-md'>
                                        <p className=' flex gap-1 py-2'>Producto: <p className='font-bold text-black'>{product.name}</p></p>
                                        <p className=' flex gap-1 py-2'>Precio: <p className='font-bold'>{product.price}</p></p>
                                        <p className=' flex gap-1 py-2'>Cantidad: <p className='font-bold'>{product.quantity}</p></p>

                                    </div>
                                )))}
                                {cuponOrden && (
                                    <div className='flex flex-col border p-4 rounded-lg shadow-md'>
                                        <p>Cupón utilizado:</p>
                                        <p className='font-bold'>{cuponOrden.key}</p>
                                        <p className='flex gap-1'>Descuento de: <p className='font-bold'>${cuponOrden.value}</p></p>
                                    </div>
                                )}
                                {cuponOrden ? (
                                    <div className='flex flex-col border p-4 rounded-lg shadow-md'>
                                        <h4 className='font-bold'>TOTAL CON DESCUENTO : ${orden.total - cuponOrden.value}</h4>
                                    </div>
                                ) : (

                                    <div className='flex flex-col border p-4 rounded-lg shadow-md'>
                                        <h4 className='font-bold'>TOTAL: ${orden.total}</h4>
                                    </div>)
                                }
                            </div>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>

        </div>

    );
}