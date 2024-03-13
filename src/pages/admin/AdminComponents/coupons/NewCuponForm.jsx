import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useProducts } from '../../../../context/ProductsContext'

const NewCuponForm = () => {
    const { createCupon, getCp } = useProducts()
    const [key, setKey] = useState('')
    const [value, setValue] = useState('')
    const [expired, setExpired] = useState('')
    console.log(key)
    const handleSubmit = (e) => {
        e.preventDefault()
        createCupon(key, value, expired)
        setKey("")
        setValue("")
        setExpired("")
        getCp()
    }
    return (
        <>
            <Container maxWidth="sm" className="mt-12">
                <h3 className="text-center font-bold mb-12 border-b">CREAR NUEVO CUPON</h3>
                <div className="mb-4 border-b w-[100px] md:w-full md:mb-2">
                    <Typography className="font-bold text-md" variant="body4">
                        Crear cupon
                    </Typography>
                </div>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Nombre del cupon"
                                variant="outlined"
                                name="key"
                                onChange={(e) => setKey(e.target.value)}
                                className="w-[60vw] sm:w-full"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type='number'
                                fullWidth
                                label="Valor de descuento en pesos"
                                variant="outlined"
                                name="value"
                                onChange={(e) => setValue(e.target.value)}
                                className="w-[60vw] sm:w-full"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <p>El cupon vence el:</p>
                            <TextField
                                type='date'
                                fullWidth
                                variant="outlined"
                                name="expired"
                                onChange={(e) => setExpired(e.target.value)}
                                className="w-[60vw] sm:w-full"
                            />
                        </Grid>
                    </Grid>
                    <Button className="w-[100%] mt-6 bg-[#cdc3b5] hover:bg-[#d4c4af]" variant="contained" color="primary" type="submit">
                        Crear cupon
                    </Button>
                </form>
            </Container>
        </>
    )
}

export default NewCuponForm