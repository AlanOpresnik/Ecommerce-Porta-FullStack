import React from 'react'
import NewCuponForm from './NewCuponForm'
import { useNavigate } from 'react-router-dom';

const NewCuponSection = () => {
  const navigate = useNavigate()

  const token = localStorage.getItem('token');

  if (!token || token == "") {
      navigate('/')
  }
  return (
    <div className='flex justify-center w-full'>
        <NewCuponForm/>
    </div>
  )
}

export default NewCuponSection