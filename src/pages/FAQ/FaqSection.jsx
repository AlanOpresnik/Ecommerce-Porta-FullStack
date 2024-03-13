import React, { useEffect } from 'react';
import { useProducts } from '../../context/ProductsContext';
import FaqItem from './FaqItem';
import { useNavigate } from 'react-router-dom';

const FaqSection = () => {
    const { Faq, getFaq } = useProducts();
    const navigate = useNavigate()

    const token = localStorage.getItem('token');

    if (!token || token == "") {
        navigate('/')
    }
    useEffect(() => {
        getFaq();
    }, []);

    return (
        <div>
            <h4 className="text-[26px] md:text-[32px] text-[#AAAAAA] text-center mt-16 mb-6 font-bold">Preguntas Frecuentes</h4>
            {Faq && Faq.length > 0 ? (
                Faq.map((faq) => (
                    <div className='mb-6'>
                        <FaqItem key={faq.id} faq={faq} /> 
                    </div>
                ))
            ) : (
                "No hay preguntas frecuentes"
            )}
        </div>
    );
};

export default FaqSection;
