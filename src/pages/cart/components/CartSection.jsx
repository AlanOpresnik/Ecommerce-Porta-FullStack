import React, { useEffect, useState } from "react";
import { useProducts } from "../../../context/ProductsContext";
import CartItems from "./CartItems";
import CartTotal from "./CartTotal";
import emptyCart from "../../../assets/img/empty_cart.png";
import { Button } from "@mui/material";
import ModalEmptyCart from "./ModalEmptyCart";
const CartSection = () => {
  const { cartItems, clearCart } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  console.log(cartItems)
  return (
    <>
      {cartItems?.length > 0 ? (
        <div>
          <h4 className="mt-14 md:mt-24 flex items-center justify-between  text-2xl border-b max-w-[500px]">
            Mi carrito
            <span onClick={handleOpenModal} className="text-sm ml-2  cursor-pointer hover:opacity-70 underline">Vaciar carrito</span>
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
          <ModalEmptyCart
        open={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={() => {
          handleCloseModal();
          clearCart();
        }}
        itemTitle={"a"}
      />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-full h-[90vh] md:h-[85vh]">
          <img className="" src={emptyCart} />
          <p className="text-xl mb-2">Su carrito se encuentra vacio </p>
          <Button
            className="bg-[#a09484]  hover:opacity-90 "
            variant="contained"
          >
            Continuar coomprando
          </Button>
        </div>
      )}
    </>
  );
};

export default CartSection;
