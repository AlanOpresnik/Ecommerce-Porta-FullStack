import React from 'react'
import ProductCarrusel from './ProductCarrusel'


const ProductsSection = () => {
  return (
    <>
    <div>
        <h4 className="text-[26px] md:text-[32px] text-[#AAAAAA] text-center mt-24 font-bold">Productos Destacados</h4>
    </div>
    <div className='max-w-full h-[600px] flex gap-12 justify-center mt-6'>
        <ProductCarrusel/>
    </div>
    </>
  )
}

export default ProductsSection