import React, { useEffect } from "react";
import { useProducts } from "../../../context/ProductsContext";
import CartItems from "./CartItems";
import CartTotal from "./CartTotal";
import emptyCart from '../../../assets/img/empty_cart.png'
import { Button } from "@mui/material";
const CartSection = () => {
  const { cartItems } = useProducts();
  return (
    <>
      {cartItems.length > 0 ? (
        <div>
          <h4 className="mt-14 md:mt-24  text-2xl border-b max-w-[280px]">
            Mi carrito
          </h4>
          <div className="grid mb-12 grid-cols-1 md:grid-cols-2">
            <div className=" mt-2 flex flex-col gap-6">
              {cartItems?.map((prod) => (
                <CartItems key={prod._id} prod={prod} />
              ))}
            </div>
            <div>
              <CartTotal />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-full h-[90vh] md:h-[85vh]">
        <img className="" src={emptyCart}/>
        <p className="text-xl mb-2">Su carrito se encuentra vacio </p>
        <Button className="bg-[#a09484]  hover:opacity-90 " variant="contained">Continuar coomprando</Button>
        </div>
      )}
    </>
  );
};

export default CartSection;
