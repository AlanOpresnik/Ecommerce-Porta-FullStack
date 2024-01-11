import React, { useState } from "react";
import RemoveRedEyeOutlined from "@mui/icons-material/RemoveRedEyeOutlined";
import prod from "../../assets/img/prod.webp";

const ProductCards = ({ prod, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div>
      <div
        key={index}
        className={`w-[300px] cursor-pointer h-auto md:h-[530px] border rounded-[20px] relative overflow-hidden transition-all ease-in-out duration-300 ${
          isHovered ? "h-auto md:h-[570px]" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="border-b-4 h-[400px] relative">
          <img
            src={prod.img} 
            className="h-full object-contain rounded-t-[20px]"
            alt="product"
          />
        </div>
        <div className="text-center p-3">
          <p>{prod.title}</p> 
          <p className="font-bold text-2xl text-[#aaaaaa]">{prod.price}</p>{" "}
        
          <p className="text-sm">
            <strong>{3}</strong> Cuotas sin interés de{" "}
            <strong>$3.200,00</strong>
          </p>
          <div
            className={`hidden md:flex gap-4 items-center justify-center opacity-0 ${
              isHovered ? "opacity-100" : ""
            } transition-opacity duration-300`}
          >
            <button className="bg-[#a2a2a2] hover:bg-[#AFAFAF] transition-colors text-white px-4 py-2 rounded-full text-sm w-[100px]">
              COMPRAR
            </button>
            <button className="text-[#9b9b9bf7] border px-4 py-2 rounded-full">
              <RemoveRedEyeOutlined /> Ver
            </button>
          </div>
          {/* Botones visibles en dispositivos móviles */}
          <div className="flex justify-center mt-2 gap-6 md:gap-2">
            <button className="md:hidden bg-[#AFAFAF] text-white px-4 py-2 rounded-full text-sm w-[100px]">
              COMPRAR
            </button>
            <button className="md:hidden text-[#9b9b9bf7] border px-4 py-2 rounded-full">
              <RemoveRedEyeOutlined /> Ver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCards;
