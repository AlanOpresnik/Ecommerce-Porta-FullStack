import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Delete,
  DeleteOutline,
  RemoveCircleOutline,
} from "@mui/icons-material";
import React, { useState } from "react";
import { useProducts } from "../../../context/ProductsContext";
import ModalDelete from "./ModalDelete";

const CartItems = ({ prod }) => {
  const { removeFromCart,setQuantity,quantity,incrementQuantity,decrementQuantity } = useProducts()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };



  return (
    <>
      <div
        className="rounded-lg border shadow-md md:shadow flex items-center py-3 justify-between mr-2 pr-6 gap-6 max-w-[500px]"
        key={prod._id}
      >
        <div className="flex items-center gap-6">
          <img
            className="h-[100px] min-w-[100px] max-w-[100px] md:h-[100px] md:min-w-[100px] rounded-md ml-2"
            src={import.meta.env.VITE_ENDPOINT_IMAGES + prod.images[0].filename}
          />
          <div className="max-w-[300px]">
            <span className="text-xs font-bold">{prod.subcategoryId.category}</span>
            <h3 className="text-sm md:text-[17px] w-full line-clamp-2 md:line-clamp-3 mb-2">{prod.name}</h3>
            <p className="text-lg md:text-2xl font-bold text-[#cbc2b6]">${prod.price}</p>
            <div className="text-center  flex items-center gap-2">
              <button onClick={() => incrementQuantity(prod)}>
                <AddCircleOutlineIcon fontSize="small" />
              </button>
              <span className="mr-0">{prod.quantity}</span>
              <button onClick={() => decrementQuantity(prod)}>
                <RemoveCircleOutline fontSize="small" />
              </button>
            </div>
          </div>
        </div>
        <div>
          <button className="hover:opacity-50" onClick={handleOpenModal}>
            <Delete />
          </button>
        </div>
      </div>
      <ModalDelete
        open={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={() => {
          handleCloseModal();
          removeFromCart(prod._id);
        }}
        itemTitle={prod.name}
      />
    </>
  );
};

export default CartItems;
