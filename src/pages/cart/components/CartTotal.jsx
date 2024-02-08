import React from "react";
import { useProducts } from "../../../context/ProductsContext";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CartTotal = () => {
  const { cartItems } = useProducts();
  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
  const navigate = useNavigate()
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
        <div className="flex justify-between border-b items-center px-3 py-6">
          <p className="text-lg md:text-xl">SUBTOTAL:</p>
          <p className="text-xl">${subtotal}</p>
        </div>
        <div className="flex justify-center py-6">

        <Button onClick={() => navigate('/checkout')} className="w-[400px] py-3 rounded-xl text-lg bg-[#cabeae] hover:opacity-90" variant="contained">Finalizar compra</Button>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
