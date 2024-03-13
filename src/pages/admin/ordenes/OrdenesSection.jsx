import React, { useEffect, useState } from 'react';
import OrdenesItem from './OrdenesItem';
import { TextField, Button } from '@mui/material';
import { useProducts } from '../../../context/ProductsContext';
import { useNavigate } from 'react-router-dom';

const OrdenesSection = () => {
  const { ordenes, getOrdenes } = useProducts();
  const [filteredOrdenes, setFilteredOrdenes] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('newest'); // State to track sorting order

  const navigate = useNavigate()

  const token = localStorage.getItem('token');

  if (!token || token == "") {
      navigate('/')
  }

  useEffect(() => {
    const filtered = ordenes.filter((orden) => {
      const nameMatch = orden.name.toLowerCase().includes(search.toLowerCase());
      return nameMatch;
    });
    setFilteredOrdenes(filtered);
  }, [search, ordenes]);

  useEffect(() => {
    getOrdenes();
  }, []);

  const handleSortToggle = () => {
    // Toggle between sorting orders
    setSortOrder(sortOrder === 'oldest' ? 'newest' : 'oldest');
  };

  // Sorting logic based on selected order
  const sortedOrdenes = [...filteredOrdenes].sort((a, b) => {
    if (sortOrder === 'oldest') {
      return new Date(a.orderDate) - new Date(b.orderDate);
    } else {
      return new Date(b.orderDate) - new Date(a.orderDate);
    }
  });

  return (
    <div className='flex flex-col items-center'>
      <h4 className='text-3xl font-bold mt-4 mb-4'>Ordenes</h4>
      <div className='w-full flex flex-wrap  justify-center'>
        <TextField
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            marginBottom: '12px',
            width: '50%',
            '@media (max-width: 600px)': {
              width: '80%',
            },
          }}
          label={'Buscar orden por nombre'}
        />
        <Button
          size='small'
          onClick={handleSortToggle}
          variant='contained'
          sx={{
            marginLeft: '12px',
            height: '50px',
            backgroundColor: '#c7b297',
            fontWeight: 'bold',
            borderRadius:"10px",
            '&:hover': {
              backgroundColor: '#ddc8af', 
            },
          }}
        >
          Ordenar: {sortOrder === 'oldest' ? 'Más Antiguas' : 'Más Recientes'}
        </Button>
      </div>
      <div className='overflow-y-scroll h-[750px]'>
        {sortedOrdenes.length > 0 ? (
          sortedOrdenes.map((orden) => <OrdenesItem key={orden._id} orden={orden} />)
        ) : (
          <p className='text-center text-xl'>No hay ninguna orden que coincida con la búsqueda.</p>
        )}
      </div>
    </div>
  );
};

export default OrdenesSection;
