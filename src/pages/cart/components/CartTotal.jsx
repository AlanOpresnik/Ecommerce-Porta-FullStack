import React from "react";
import { useProducts } from "../../../context/ProductsContext";
import { Button } from "@mui/material";

const CartTotal = () => {
  const { cartItems } = useProducts();
  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
  return (
    <div className="border rounded mt-16 md:mt-0 px-2 relative md:sticky md:top-[190px]">

      <div>
        <h3 className="text-3xl border-b py-4 text-center">
          Resumen del pedido
        </h3>
        <div className="flex justify-between border-b items-center px-3 py-6">
          <p className="text-xl">Cantidad de productos</p>
          <p className="text-lg">{cartItems.length}</p>
        </div>
        <div className="flex justify-between border-b items-center px-3 py-6">
          <p className="text-xl">Productos:</p>

          <div className="flex flex-col max-w-[200px] ">
          {cartItems.map((item => (
            <p key={item._id} className="line-clamp-2 border-b py-2">*{item.name}</p>
          )))}
          </div>
        </div>
        <div className="flex justify-between border-b items-center px-3 py-6">
          <p className="text-xl">SUBTOTAL:</p>
          <p className="text-lg">${subtotal}</p>
        </div>
        <div className="flex justify-center py-6">

        <Button className="w-[400px] py-3 rounded-xl text-lg bg-[#cabeae] hover:opacity-90" variant="contained">Finalizar compra</Button>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
