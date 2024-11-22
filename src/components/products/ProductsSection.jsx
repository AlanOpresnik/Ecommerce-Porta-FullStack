import React, { useEffect } from 'react'
import ProductCarrusel from './ProductCarrusel'
import { useProducts } from '../../context/ProductsContext'


const ProductsSection = () => {
  const { loading, prodItems, fetchProducts } = useProducts()
  useEffect(() => {
    fetchProducts();
  }, [])
  return (
    <>
      {prodItems.length > 0 ? (
        <div>
          <div>
            <h4 className="text-[26px] md:text-[32px] text-[#AAAAAA] text-center mt-24 font-bold">Productos Destacados</h4>
          </div>
          <div className='max-w-full   gap-12 justify-center mt-6'>
            {loading ? (
              <div className='flex justify-center mt-40'>

                <span class="loader"></span>
              </div>
            ) : <ProductCarrusel />}

          </div>
        </div>
      ) : ''}
    </>
  )
}

export default ProductsSection