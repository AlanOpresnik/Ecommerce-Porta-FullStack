import React, { useEffect } from 'react'
import { useProducts } from '../../../context/ProductsContext';
import FaqItemUi from './FaqItemUi';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const FaqSection = () => {
  const { Faq, getFaq } = useProducts();
  useEffect(() => {
    getFaq()
  }, [])

  return (
    <div className='mt-56 w-full text-black '>
      <div>
        <h4 className='text-4xl font-bold text-center'>¿Tienes preguntas?</h4>
        <p className='text-lg text-center mt-2'>Nosotros tenemos respuestas</p>
        <div className='w-full'>
          <h4 className="text-[26px] md:text-[32px] text-[#AAAAAA] text-center mt-16 mb-6 font-bold">Preguntas Frecuentes</h4>
          {Faq && Faq.length > 0 ? (
            <div>
              {Faq.map((faq) => (
                <div className='mb-6'>
                  <FaqItemUi faq={faq} key={faq._id} />
                </div>
              ))}
              <div className='flex justify-center mt-16'>
                <Button
                className='mb-12'
                  sx={{
                    backgroundColor: "#a59b8e",
                    '&:hover': {
                      backgroundColor: "#b2a492", 
                    }
                  }}
                  as={Link
                  } to={`https://wa.me/+5491170023400`}
                  target='_BLANK' variant='contained'>Necesito una atencion personalizada</Button>
              </div>
            </div>

          ) : (
            "No hay preguntas frecuentes"
          )}
        </div>
      </div>
    </div>
  )
}

export default FaqSection