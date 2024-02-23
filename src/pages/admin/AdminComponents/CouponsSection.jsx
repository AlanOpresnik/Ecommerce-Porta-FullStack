import React, { useEffect } from 'react'
import { useProducts } from '../../../context/ProductsContext'
import CouponsItem from './CouponsItem'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const CouponsSection = () => {
    const { getCoupons, coupons } = useProducts()
    useEffect(() => {
        getCoupons()
        console.log(coupons)
    }, [])
    const navigate = useNavigate()
    return (
        <div className='flex flex-col items-center w-full'>
            <h3 className='text-2xl font-bold py-6'>Cupones</h3>
            <div className='grid grid-cols-1 px-4 md:grid-cols-2 gap-6'>
                {coupons?.map((coupon => (
                    <div className=''>
                        <CouponsItem coupon={coupon} />
                    </div>
                )))}
            </div>
            <Button onClick={() => navigate(`/adminPortaflex/logeado/estadoDelIncioSucces=a878373734674674238283283723467426712/newcupon`)} sx={{
                marginTop: '30px',
            }} >Crear nuevo cupon</Button>
        </div>
    )
}

export default CouponsSection