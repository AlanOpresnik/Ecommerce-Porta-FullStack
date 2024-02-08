import React from 'react'
import ilustracion from '../../../../assets/img/Ilustracion.png'

const Ilustracion = () => {
  return (
    <div className=' mt-0 md:mt-20 h-[400px] flex flex-col justify-center items-center'>
        <img className='w-[200px] object-contain md:w-full h-full' src={ilustracion}/>
        <p className='text-xs border-b pb-2'>Completa el formulario para terminar la compra</p>
    </div>
  )
}

export default Ilustracion