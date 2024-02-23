import React, { useEffect } from 'react'

import NewCpForm from './NewCpForm'
import { useProducts } from '../../../../context/ProductsContext'
import { useNavigate } from 'react-router-dom'
import CpItem from './CpItem'
import { Button } from '@mui/material'

const CpSection = () => {
    const {getCp,cp} = useProducts()
    useEffect(() => {
        getCp()
        console.log(cp)
    }, [])
    const navigate = useNavigate()
    return (
        <div className='flex flex-col items-center w-full'>
            <h3 className='text-2xl font-bold py-6'>Codigos postales</h3>
            <div className='grid grid-cols-1 px-4 md:grid-cols-2 gap-6'>
                {cp?.map((cp => (
                    <div className=''>
                        <CpItem cp={cp} />
                    </div>
                )))}
            </div>
            <Button onClick={() => navigate(`/adminPortaflex/logeado/estadoDelIncioSucces=a878373734674674238283283723467426712/newCp`)} sx={{
                marginTop: '30px',
            }} >Crear nuevo Codigo postal</Button>
        </div>
    )
}

export default CpSection