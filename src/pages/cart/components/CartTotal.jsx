import React, { useEffect, useState } from "react";
import { useProducts } from "../../../context/ProductsContext";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CartTotal = () => {
  const [cupon, setCupon] = useState("");
  const [descuento, setDescuento] = useState(0);
  const { cartItems, ValidateCupon, cuponData } = useProducts();
  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
  const navigate = useNavigate();

  useEffect(() => {
    if (cuponData && cuponData.success) {
      setDescuento(cuponData.discountValue);
    } else {
      setDescuento(0);
    }
  }, [cuponData]);



  return (
    <div className="border  max-w-[600px] rounded mt-16 md:mt-0 px-2 relative md:sticky md:top-[190px]">

      <div>
        <h3 className="text-xl md:text-2xl border-b py-4 text-center">
          Resumen del pedido
        </h3>
        <div className="flex justify-between border-b items-center px-3 py-6">
          <p className="text-lg md:text-xl">Cantidad de productos</p>
          <p className="text-xl">{cartItems.length}</p>
        </div>
        <div className="flex justify-between border-b items-center px-3 py-6">
          <p className="text-lg md:text-xl">Productos:</p>

          <div className="flex flex-col max-w-[200px] ">
            {cartItems.map((item => (
              <p key={item._id} className="line-clamp-2 border-b py-2">*{item.name}</p>
            )))}
          </div>
        </div>
        {descuento > 0 && (
          <div className="flex justify-between border-b items-center px-3 py-6">
            <p className="text-lg md:text-xl">Precio anterior:</p>
            <p className="text-xl">
              <span style={{ textDecoration: 'line-through' }}>${subtotal}</span>
            </p>
          </div>
        )}
        {descuento > 0 && (
          <div className="flex justify-between border-b items-center px-3 py-6">
            <p className="text-lg md:text-xl">Descuento:</p>
            <p className="text-xl">
              Descuento de ${descuento}
            </p>
          </div>
        )}
        <div className="flex justify-between border-b items-center px-3 py-6">
          <p className="text-lg md:text-xl">Precio final:</p>
          <p className="text-xl">
            ${subtotal - descuento}
          </p>
        </div>
        <div className="">
          <p className="mt-2 text-[#887966] text-xs">¿Tenes un <span className="text-[#887966] font-bold">cupon?</span></p>
          <div className="flex items-center align-middle h-full">
            <TextField
              onChange={(e) => setCupon(e.target.value)}
              size="small"
              label="Canjear cupon"
              variant="outlined"
              type="text"
              name="Cupon"
              sx={{
                padding: "1px !important",
                marginTop: "8px",
                marginRight: '10px'

              }}
              className="w-[60vw] sm:w-auto "
            />
            <Button onClick={() => ValidateCupon(cupon)}>
              Validar cupon
            </Button>
          </div>

        </div>
        <div className="flex justify-center text-xs py-6">

          <Button sx={{
            width: "400px",
            paddingY: "0.75rem",
            paddingX: "1.5rem",
            borderRadius: "0.5rem",
            backgroundColor: "#cabeae",
            color: "#fff",
            "&:hover": {
              opacity: '90',
              backgroundColor: "#b9a992"
            }
          }}
            onClick={() => navigate('/checkout')}
            variant="contained">Finalizar compra</Button>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
