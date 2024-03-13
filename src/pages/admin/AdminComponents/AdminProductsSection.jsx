import React, { useEffect, useState } from 'react'
import { useProducts } from '../../../context/ProductsContext'
import ProductInfoCard from './ProductInfoCard'
import ProdAdminCard from './ProdAdminCard'
import DropDownCategorys from './DropDownCategorys'
import { Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'


const AdminProductsSection = () => {
    const { prodItems } = useProducts();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null); // Nuevo estado para la categoría seleccionada

    const navigate = useNavigate()

    const token = localStorage.getItem('token');

    if (!token || token == "") {
        navigate('/')
    }


    useEffect(() => {
        const filtered = prodItems.filter((prod) => {

            const nameMatch = prod.name.toLowerCase().includes(search.toLowerCase());
            const categoryMatch = !selectedCategory || prod.subcategoryId?.category === selectedCategory; // Filtrar por categoría si se ha seleccionado una
            return nameMatch && categoryMatch;
        });
        setFilteredProducts(filtered);
    }, [search, prodItems, selectedCategory]);

    return (
        <div className='w-full flex flex-col items-center mt-6'>
            <h4 className='text-lg mb-2 px-2'>Productos activos</h4>
            <ProductInfoCard />
            <div className='flex gap-4 ml-2'>
                <input
                    type="text"
                    placeholder="Buscar productos"
                    value={search}
                    className="border w-[200px] md:w-[540px] p-2 rounded"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <DropDownCategorys onSelectCategory={setSelectedCategory} />
            </div>

            <div className="mt-6 overflow-y-scroll max-h-[35rem] pb-6">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((prod) => (
                        <div key={prod._id} className="mt-6 border-b p-2">
                            <ProdAdminCard prod={prod} />
                        </div>
                    ))
                ) : (
                    <div>
                        <p className="text-center text-xl">
                            No hay ningún producto.
                        </p>

                    </div>
                )}
            </div>
            <div className='mt-12'>
                <Button color='primary' size='large' variant='contained' as={Link} to={"/adminPortaflex/logeado/estadoDelIncioSucces=a878373734674674238283283723467426712/upload"}>Agregar nuevo producto</Button>
            </div>
        </div>
    );
};

export default AdminProductsSection;