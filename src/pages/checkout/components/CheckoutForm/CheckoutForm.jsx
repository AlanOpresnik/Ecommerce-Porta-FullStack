import React from "react";
import { Container, TextField, Button, Grid, Typography } from "@mui/material";

function CheckoutForm() {
  return (
    <Container maxWidth="sm" className="mt-6 md:mt-16  py-6">
    <div className="mb-4 border-b w-[100px] md:w-full md:mb-2">

      <Typography className="font-bold text-md" variant="body4">
        Finalizar compra
      </Typography>
    </div>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Nombre" variant="outlined" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Apellido" variant="outlined" required />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Dirección"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Número de teléfono"
              variant="outlined"
              type="tel"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="DNI" variant="outlined" required />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Código Postal"
              variant="outlined"
              required
            />
          </Grid>
        </Grid>
        <Button
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
