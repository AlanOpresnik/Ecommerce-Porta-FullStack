import React, { useEffect, useState } from 'react'
import ProductsFeatured from './ProductsFeatured';

import FeaturedInfoCard from './FeaturedInfoCard';
import { useProducts } from '../../../context/ProductsContext';

const FeaturedSection = () => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const { prodItems } = useProducts()
    useEffect(() => {
        const filtered = prodItems.filter(product => product.featured === true);
        setFilteredProducts(filtered);
    }, [prodItems]);
    return (
        <div className='w-full flex flex-col items-center mt-6'>
            <h4 className='text-lg mb-2 px-2'>Productos Destacados</h4>
            <FeaturedInfoCard />

            <div className="mt-6 overflow-y-scroll max-h-[35rem] pb-6">
                {filteredProducts.map((prod => (
                    <ProductsFeatured prod={prod} />
                )))}
            </div>
        </div>
    );
};

export default FeaturedSection