import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, TextField, Button, Select, MenuItem, Modal, Box, ListItemIcon, ListItemText } from "@mui/material";
import axios from 'axios';
import { useProducts } from '../../../../context/ProductsContext';
import { Navigate, redirect, useNavigate } from "react-router-dom";
import ReactConfetti from 'react-confetti';
import mercadoPago from '../../../../assets/img/mercadoPago.png'
import billete from '../../../../assets/img/billete.png'
import tarjeta from '../../../../assets/img/tarjeta.png'

function CheckoutForm() {
  const { cartItems, getCp, cp, precioFinal, getCuotasCard } = useProducts();
  const [codigoPostalEncontrado, setCodigoPostalEncontrado] = useState(null);
  const [pagado, setPagado] = useState(false);
  const [existe, setExiste] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false); // Nuevo estado para controlar la visualización del confeti
  const [open, setOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [bin, setBin] = useState("");
  const [totalCuotas, setTotalCuotas] = useState(0)
  const [displayCardVenc, setDisplayCardVenc] = useState(''); // Visualización formateada


  // useEffect para verificar la validez del formulario



  const handldeCuotas = () => {
    setTotalCuotas(precioFinal + codigoPostalEncontrado)

    getCuotasCard(bin, totalCuotas)

    console.log(bin)
    console.log(JSON.stringify(totalCuotas))
  }

  const [formData, setFormData] = useState({
    name: '',
    apellido: '',
    email: '',
    shippingAddress: '',
    tel: '',
    dni: '',
    shippingMethod: '',
    paymentMethod: '',
    cp: "",
    cpId: '',
    //creditCardNumber: '',
    //cardVenc: '', // Valor crudo (sin formato)
    //cvv: '',
    couponKey: localStorage.getItem(`couponKey`) === '' ? '0' : localStorage.getItem(`couponKey`),
    productList: JSON.parse(localStorage.getItem('cartItems')) || []
  });

  console.log(localStorage.getItem(`couponKey`))

  useEffect(() => {
    getCp();
  }, []);

  console.log(cartItems[0])
  localStorage.setItem(`cpKey`, formData.cp)


  useEffect(() => {
    console.log(formData)
    const isValid = Object.values(formData).every(value => value !== undefined && value !== null && value !== "");
    setIsFormValid(isValid);
  }, [formData]);

  const validatePostalCode = () => {
    const formDataCpNumber = parseInt(formData.cp);
    const cpEncontrado = cp.find((cpItem) => cpItem.key === formDataCpNumber);

    if (cpEncontrado && cpEncontrado.price === 0) {
      setShowConfetti(true);
      setOpen(true)
      setTimeout(() => {
        setOpen(false)
      }, 2500);
    }
    if (cpEncontrado) {
      setExiste(true);
      setCodigoPostalEncontrado(cpEncontrado);
      setFormData(prevState => ({
        ...prevState,
        cpId: cpEncontrado._id,
      }));
      console.log(cpEncontrado._id)
    } else {
      setExiste(false);
      setCodigoPostalEncontrado("");
      setFormData(prevState => ({
        ...prevState,
        cpId: '' // Limpia el ID del código postal
      }));
    }
  };

  const handleInputChange = (event) => {

    /* if(name === "creditCardNumber") {
       setBin(value);
     }
 
     if (name === 'cardVenc') {
       // Permitir solo números y limitar a 4 caracteres
       const rawValue = value.replace(/\D/g, '').slice(0, 4); // Solo números, máximo 4 dígitos
 
       // Formatear como MM/AA
       const formattedValue = rawValue.replace(/(\d{2})(\d{0,2})/, (_, mm, aa) => (aa ? `${mm}/${aa}` : mm));
 
       setDisplayCardVenc(formattedValue);
       setFormData((prev) => ({ ...prev, cardVenc: rawValue }));
     } else {
       setFormData((prev) => ({ ...prev, [name]: value }));
     }*/
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(formData)
      const nombreCompleto = formData.apellido ? `${formData.name} ${formData.apellido}` : formData.name;
      const response = await axios.post('https://portaflex.com.ar/api/mercadopago/crear-preferencia', {
        ...formData,
        name: nombreCompleto,
      });
      console.log(response)

      window.location.href = response.data.init_point

      localStorage.setItem(`OrderId`, response.data.orderId)
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <Container maxWidth="sm" className="mt-6 md:mt-6 py-6">
      {showConfetti && <ReactConfetti recycle={false} />}
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
              sx={{ display: 'flex', height: "55px" }}
              name='paymentMethod'
              fullWidth
              value={formData.paymentMethod}
              onChange={handleInputChange}
              variant="outlined"
              displayEmpty
              renderValue={(selected) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {selected === 'Efectivo' && (
                    <ListItemIcon>
                      <img src={billete} alt="Efectivo" style={{ width: '30px', height: "25px" }} />
                    </ListItemIcon>
                  )}
                  {selected === 'Mercado Pago' && (
                    <ListItemIcon>
                      <img src={mercadoPago} alt="Mercado Pago" style={{ width: '30px', height: "25px" }} />
                    </ListItemIcon>
                  )}

                  {/*selected === 'Tarjeta de credito' && (
                    <ListItemIcon>
                      <img src={tarjeta} alt="tarjeta" style={{ width: '30px', height: "25px" }} />
                    </ListItemIcon>
                  )*/}
                  <ListItemText primary={selected || "Método de pago"} />
                </div>
              )}
            >
              <MenuItem disabled value="">
                Método de pago
              </MenuItem>
              <MenuItem value="Efectivo">
                <ListItemIcon>
                  <img src={billete} alt="billete" style={{ width: '25px' }} />
                </ListItemIcon>
                <ListItemText primary="Efectivo" />
              </MenuItem>
              <MenuItem value="Mercado Pago">
                <ListItemIcon>
                  <img src={mercadoPago} alt="Mercado Pago" style={{ width: '25px' }} />
                </ListItemIcon>
                <ListItemText primary="Mercado Pago" />
              </MenuItem>
              {/*
              <MenuItem value="Tarjeta de credito">
                <ListItemIcon>
                  <img src={tarjeta} alt="Mercado Pago" style={{ width: '25px' }} />
                </ListItemIcon>
                  <ListItemText primary="Tarjeta de credito" />
              </MenuItem>
                */}
            </Select>
          </Grid>
          <>
            {formData.paymentMethod === 'Tarjeta de credito' && (
              <>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="Titular"
                    label="Titular de la tarjeta"
                    value={formData.Titular} // Usar la clave correspondiente del estado
                    onChange={handleInputChange}
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="creditCardNumber"
                    label="Número de tarjeta de crédito"
                    value={formData.creditCardNumber} // Corregido: usa el estado correspondiente
                    onChange={handleInputChange}
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="cardVenc"
                    label="Fecha de vencimiento (MM/AA)"
                    value={displayCardVenc} // Usa el estado de display para formatear
                    onChange={handleInputChange}
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="cvv"
                    label="Código de seguridad"
                    value={formData.cvv} // Corregido: usa el estado correspondiente
                    onChange={handleInputChange}
                    variant="outlined"
                    required
                  />
                </Grid>
                <div className="flex justify-center w-full py-6">
                  <Button onClick={handldeCuotas} variant="contained">
                    VALIDAR TARJETA DE CREDITO
                  </Button>
                </div>
              </>
            )}
          </>
          <Grid item xs={12} >
            <TextField
              name='cp'
              fullWidth
              label="Código Postal"
              variant="outlined"
              value={formData.cp}
              onChange={handleInputChange}
              required />
            <Button onClick={validatePostalCode}>Validar código postal</Button>
            {existe ? (
              <div className='flex flex-col ml-2 border rounded-xl p-2 shadow-md'>
                <p className='flex gap-1'>Localidad: <p className='font-bold'>{codigoPostalEncontrado.location}</p></p>
                <p className='flex gap-1'>Costo de envío: <p className='font-bold'>{codigoPostalEncontrado.price === 0 ? (<p className='underline font-bold text-[#4ca74c]'>GRATIS</p>) : codigoPostalEncontrado.price}</p></p>
                <p className='flex gap-1 text-lg  py-2 border-t'>TOTAL FINAL + ENVÍO: <p className='font-bold'>{precioFinal + codigoPostalEncontrado.price}</p></p>
              </div>
            ) : (codigoPostalEncontrado === null ? "" : (
              <div>
                <p className='flex gap-1 items-center'>Todavia no llegamos a esa <p className='font-bold text-black'>zona 😪</p></p>
              </div>
            ))}
          </Grid>


        </Grid>
        <Button
          onClick={() => setPagado(true)}
          disabled={!isFormValid}
          type='submit'
          sx={{
            marginTop: "1.5rem",
            backgroundColor: "#cdc3b5",
            ":hover": {
              backgroundColor: "#d4c4af",
            }
          }}
          className="mt-6 bg-[#cdc3b5] !p-2 hover:bg-[#d4c4af]"
          variant="contained"
          color="primary"
          fullWidth
        >
          {!isFormValid ? "Asegurate de rellenar todos los campos" : pagado ? "Pagando..." : 'Confirmar compra'}
        </Button>

      </form>
    </Container>
  );
}

export default CheckoutForm;