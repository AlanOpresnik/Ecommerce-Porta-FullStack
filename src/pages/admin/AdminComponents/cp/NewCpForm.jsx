import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const NewCpForm = () => {
    const tokenFormated = localStorage.getItem('token').replace(/['"]+/g, '');
    const [location, setLocation] = useState("")
    const [key, setKey] = useState(0)
    const [price, setPrice] = useState(0)

    const navigate = useNavigate()

    const token = localStorage.getItem('token');

    if (!token || token == "") {
        navigate('/')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            const response = axios.post(`https://portaflex.com.ar/api/cp/create`, {
                location: location,
                key: key,
                price: price,
            }, {
                headers: {
                    Authorization: `Bearer ${tokenFormated}`
                }
            })


        } catch (error) {
            console.log(error)
        }

    }
    return (
        <>
            <Container maxWidth="sm" className="mt-12">
                <h3 className="text-center font-bold mb-12 border-b uppercase">Agregar nuevo codigo postal</h3>
                <div className="mb-4 border-b w-[100px] md:w-full md:mb-2">
                    <Typography className="font-bold text-md" variant="body4">
                        Agregar nuevo codigo postal
                    </Typography>
                </div>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Localidad"
                                variant="outlined"
                                name="location"
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-[60vw] sm:w-full"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type='number'
                                fullWidth
                                label="Numero del codigo postal"
                                variant="outlined"
                                name="key"
                                onChange={(e) => setKey(e.target.value)}
                                className="w-[60vw] sm:w-full"
                            />
                        </Grid>
                        <Grid className='mb-12' item xs={12}>
                            <p>Valor del envio</p>
                            <TextField
                                type='number'
                                fullWidth
                                variant="outlined"
                                name="price"
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-[60vw] sm:w-full"
                            />
                        </Grid>
                    </Grid>
                    <div className='mt-5'>

                        <Button className="w-[100%] mt-6 bg-[#cdc3b5] hover:bg-[#d4c4af]" variant="contained" color="primary" type="submit">
                            Crear cupon
                        </Button>
                    </div>
                </form>
            </Container>
        </>
    )
}

export default NewCpForm