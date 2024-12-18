import React, { useState } from "react";
import RemoveRedEyeOutlined from "@mui/icons-material/RemoveRedEyeOutlined";
import prod from "../../assets/img/prod.webp";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext";
import formatProductName from "../../helpers/formatProductName";

const ProductCards = ({ prod, index }) => {
  const { handleRedirect, loading } = useProducts()
  const [isHovered, setIsHovered] = useState(false);


  const navigate = useNavigate();
  return (

    <div>
      {loading  ? (
        <p>cargando...</p>
      ) : (
        <div
          key={index}
          className={`w-[220px] hover:opacity-90  md:w-[300px] cursor-pointer h-auto md:h-[380px] border rounded-[20px] relative overflow-hidden transition-all ease-in-out duration-300 ${isHovered ? "h-auto md:!h-[420px]" : ""
            }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => handleRedirect(prod._id, prod.subcategoryId.category, formatProductName(prod.subcategoryId.name), formatProductName(prod.name))}
        >
          <div className="border-b-4 h-[280px] md:h-[250px] relative">
            <img
             src={prod?.images.length === 0 
              ? "/no-image.jpg" 
              : prod?.images[0].secure_url}
              className="h-full  w-full rounded-t-[20px]"
              alt="product"
            />
          </div>
          <div className="text-center flex  flex-col items-center p-3">
            <p className="line-clamp-2 w-[190px] text-center font-bold">{prod.name}</p>
            <p className="font-bold text-2xl text-[#ddd6cd]">${prod.price}</p>{" "}
            <p className="text-sm">
              <strong>{3}</strong> Cuotas sin interés de{" "}
              <strong>$3.200,00</strong>
            </p>
            <div
              className={`hidden md:flex gap-4 items-center justify-center opacity-0 ${isHovered ? "opacity-100" : ""
                } transition-opacity duration-300`}
            >
              <button className="bg-[#DDD6CD] hover:bg-[#e5ded5] transition-colors text-white px-4 py-2 rounded-full text-sm w-[100px]">
                COMPRAR
              </button>
              <button className="text-[#9b9b9bf7] border px-4 py-2 rounded-full">
                <RemoveRedEyeOutlined /> Ver
              </button>
            </div>
            {/* Botones visibles en dispositivos móviles */}
            <div className="flex justify-center mt-2 gap-6 md:gap-2">
              <button className="md:hidden bg-[#DDD6CD] text-white px-4 py-2 rounded-full text-sm w-[100px]">
                COMPRAR
              </button>
              <button className="md:hidden text-[#9b9b9bf7] border px-4 py-2 rounded-full">
                <RemoveRedEyeOutlined />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};

export default ProductCards;
