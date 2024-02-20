import React, { useEffect, useState } from 'react'
import OrdenesItem from './OrdenesItem'
import { TextField } from '@mui/material'
import { useProducts } from '../../../context/ProductsContext';

const OrdenesSection = () => {
  const { ordenes } = useProducts();
  const [filteredOrdenes, setFilteredOrdenes] = useState([]);
  const [search, setSearch] = useState("")
  useEffect(() => {
    const filtered = ordenes.filter((orden) => {
      const nameMatch = orden.name.toLowerCase().includes(search.toLowerCase());
      return nameMatch;
    });
    setFilteredOrdenes(filtered);
  }, [search, ordenes]);
  return (
    <div className='flex flex-col items-center'>
      <h4 className='text-3xl  font-bold mt-4 mb-4'>Ordenes</h4>
      <div className='w-full flex justify-center'>
        <TextField
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            marginBottom: "12px",
            width: "50%",
            '@media (max-width: 600px)': {
              width: "80%",
            },
          }}
          label={"Buscar orden por nombre"}
        />
      </div>
      <div className=' overflow-y-scroll h-[800px]'>
        {filteredOrdenes.length > 0 ? (
          filteredOrdenes.map((orden) => (
            <OrdenesItem key={orden._id} orden={orden} />
          ))
        ) : (
          <p className="text-center text-xl">
            No hay ninguna orden que coincida con la búsqueda.
          </p>
        )}
      </div>
    </div>
  )
}

export default OrdenesSection