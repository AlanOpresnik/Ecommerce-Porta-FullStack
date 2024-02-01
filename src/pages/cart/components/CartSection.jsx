import React, { useEffect } from "react";
import { useProducts } from "../../../context/ProductsContext";
import CartItems from "./CartItems";
import CartTotal from "./CartTotal";

const CartSection = () => {
  const { cartItems } = useProducts();
  return (
    <>
      <h4 className="mt-14 md:mt-24  text-2xl border-b max-w-[280px]">Mi carrito</h4>
      <div className="grid mb-12 grid-cols-1 md:grid-cols-2">
        <div className=" mt-2 flex flex-col gap-6">
          {cartItems?.map((prod) => (
            <CartItems key={prod._id} prod={prod} />
          ))}
        </div>
        <div>
            <CartTotal/>
        </div>
      </div>
    </>
  );
};

export default CartSection;
