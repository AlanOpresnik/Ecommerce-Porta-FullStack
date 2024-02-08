import React from 'react'
import { useProducts } from '../../../../context/ProductsContext'
import emptyCart from '../../../../assets/img/empty_cart.png'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import Ilustracion from '../ilustracion/Ilustracion';
const CheckoutSection = () => {
    const { cartItems } = useProducts();
    const navigate = useNavigate()
    return (
        cartItems.length > 0 ? (
            <div className="max-w-[1380px] h-full pb-24 pt-12 flex-wrap flex flex-col-reverse md:grid-cols-2 md:grid px-4 mx-auto">
                <CheckoutForm />
                <Ilustracion />
            </div>
        ) : (
            <div className="flex flex-col justify-center items-center w-full h-[90vh] md:h-[85vh]">
        <img className="" src={emptyCart}/>
        <p className="text-xl mb-2">No hay productos para finalizar la compra </p>
        <Button onClick={() => navigate('/products/hogar')} className="bg-[#a09484]  hover:opacity-90 " variant="contained">Continuar comprando</Button>
        </div>
        )
    );
};

export default CheckoutSection;