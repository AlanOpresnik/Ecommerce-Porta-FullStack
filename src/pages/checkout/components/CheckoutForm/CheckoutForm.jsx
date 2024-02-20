import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, TextField, Button, Select, MenuItem } from "@mui/material";
import axios from 'axios';
import { useProducts } from '../../../../context/ProductsContext';
import { Navigate, redirect, useNavigate } from "react-router-dom";
function CheckoutForm() {
  const { cartItems } = useProducts();
  const navigate = useNavigate()
  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    shippingAddress: '',
    tel: '',
    dni: '',
    shippingMethod: '',
    paymentMethod: '',
    cp: '',
    total: subtotal,
    productList: JSON.parse(localStorage.getItem('cartItems')) || [] // Obtener productos del localStorage o un array vacío si no hay ninguno
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value); // Agregar esta línea para depurar
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value 
    }));
  };
  useEffect(() => {
    // Actualizar productList en localStorage cada vez que cambia en formData
    localStorage.setItem('cartItems', JSON.stringify(formData.productList));
  }, [formData.productList]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const nombreCompleto = formData.apellido ? `${formData.name} ${formData.apellido}` : formData.name;
      const response = await axios.post('https://www.portaflex.com.ar/api/mercadopago/crear-preferencia', {
        ...formData,
        name: nombreCompleto,
      });
      console.log('Respuesta:', response.data);
      console.log(response.data.response.init_point);
      if (response.data.success === true) {
        console.log("kasdfjmioásdjmasdf");
        window.location.href = response.data.response.init_point;
      }
     
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <Container maxWidth="sm" className="mt-6 md:mt-16 py-6">
      <div className="mb-4 border-b w-[100px] md:w-full md:mb-2">
        <Typography className="font-bold text-md" variant="body4">
          Finalizar compra
        </Typography>
      </div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name='name'
              label="Nombre"
              value={formData.name}
              onChange={handleInputChange}
              variant="outlined"
              required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name='apellido'
              label="Apellido"
              value={formData.apellido}
              onChange={handleInputChange}
              variant="outlined"
              required />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name='email'
              label="Correo electronico"
              variant="outlined"
              required
              value={formData.correo}
              onChange={handleInputChange}
            />
          </Grid>


          <Grid item xs={12}>

            <TextField
              fullWidth
              name='shippingAddress'
              label="Dirección"
              variant="outlined"
              value={formData.direccion}
              onChange={handleInputChange}
              required />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name='tel'
              fullWidth
              label="Número de teléfono"
              value={formData.telefono}
              onChange={handleInputChange}
              variant="outlined" type="tel" required />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name='dni'
              fullWidth
              label="DNI"
              value={formData.dni}
              onChange={handleInputChange}
              variant="outlined" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              fullWidth
              name='shippingMethod'
              value={formData.shippingMethod}
              onChange={handleInputChange}
              variant="outlined"
              displayEmpty
            >
              <MenuItem disabled value="">Método de envío</MenuItem>
              <MenuItem value="envio">Envío</MenuItem>
              <MenuItem value="retiro">Retiro en sucursal</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              name='paymentMethod'
              fullWidth
              value={formData.paymentMethod}
              onChange={handleInputChange}
              variant="outlined"
              displayEmpty
            >
              <MenuItem disabled value="">Método de pago</MenuItem>
              <MenuItem value="efectivo">Efectivo</MenuItem>
              <MenuItem value="mercadoPago">Mercado pago</MenuItem>
              <MenuItem value="tarjeta">Tarjeta de crédito</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} >
            <TextField
              name='cp'
              fullWidth
              label="Código Postal"
              variant="outlined"
              value={formData.cp}
              onChange={handleInputChange}
              required />
          </Grid>
        </Grid>
        <Button
          type='submit'
          sx={{
            marginTop: "1.5rem",
            backgroundColor: "#cdc3b5",
            ":hover": {
              backgroundColor: "#d4c4af",
            }
          }}
          className="mt-6 bg-[#cdc3b5] hover:bg-[#d4c4af]"
          variant="contained"
          color="primary"
          fullWidth
        >
          Pagar
        </Button>
      </form>
    </Container>
  );
}

export default CheckoutForm;