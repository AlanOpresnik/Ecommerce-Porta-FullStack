import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Delete,
  DeleteOutline,
  RemoveCircleOutline,
} from "@mui/icons-material";
import React, { useState } from "react";

const CartItems = ({ prod }) => {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <>
      <div
        className=" shadow-md md:shadow flex items-center py-3 justify-between pr-6 gap-6 max-w-[600px]"
        key={prod._id}
      >
        <div className="flex items-center gap-6">
          <img
            className="h-[100px] min-w-[100px] md:h-[140px] md:min-w-[140px] w-[140px rounded-md shadow-md"
            src={import.meta.env.VITE_ENDPOINT_IMAGES + prod.images[0].filename}
          />
          <div>
            <span className="text-xs font-bold">{prod.category}</span>
            <h3 className="text-sm md:text-xl line-clamp-2 md:line-clamp-3 mb-2">{prod.name}</h3>
            <p className="text-lg md:text-2xl font-bold text-[#cbc2b6]">${prod.price}</p>
            <div className="text-center  flex items-center gap-2">
              <button onClick={incrementQuantity}>
                <AddCircleOutlineIcon fontSize="small" />
              </button>
              <span className="text-center">{quantity}</span>
              <button onClick={decrementQuantity}>
                <RemoveCircleOutline fontSize="small" />
              </button>
            </div>
          </div>
        </div>
        <div>
        <button>
          <Delete />
        </button>
        </div>
      </div>
    </>
  );
};

export default CartItems;
