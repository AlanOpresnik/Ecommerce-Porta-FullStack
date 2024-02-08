import React, { useState } from "react";
import RemoveRedEyeOutlined from "@mui/icons-material/RemoveRedEyeOutlined";
import { useProducts } from "../../../context/ProductsContext";

const ProductCompraCard = ({ prod, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { handleRedirect } = useProducts();
  const formattedProductName = prod.name.replace(/ /g, "-");

  return (
    <div>
      <div
        key={index}
        className={`w-[175px] md:w-[190px] md:h-[440px] xl:w-[235px]  cursor-pointer h-auto  border rounded-[20px] relative overflow-hidden transition-all ease-in-out duration-300 ${
          isHovered ? "h-auto md:h-[489px]" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() =>
          handleRedirect(prod._id, prod.category , formattedProductName)
        }
      >
        <div className="border-b-4 h-[260px] md:h-[300px] relative">
          <img
            src={
              import.meta.env.VITE_ENDPOINT_IMAGES + prod?.images[0].filename
            }
            className="h-full object-cover rounded-t-[20px]"
            alt="product"
            loading="lazy"
          />
        </div>
        <div className="text-center relative p-3">
          <p className="line-clamp-2">{prod.name}</p>
          <p className="font-bold text-2xl text-[#ddd6cd]">{prod.price}</p>{" "}
          <p className="text-sm">
            <strong>{3}</strong> Cuotas sin interés de{" "}
            <strong>$3.200,00</strong>
          </p>
          <div
            className={`hidden md:flex gap-4 items-center justify-center md:absolute lg:relative lg:bottom-0 md:bottom-[-29px] md:left-[6px] lg:left-0 lg:mt-1 opacity-0 ${
              isHovered ? "opacity-100" : ""
            } transition-opacity duration-300`}
          >
            <button className="bg-[#DDD6CD] hover:bg-[#e5ded5] transition-colors text-white px-4 py-2 rounded-full md:text-xs lg:text-sm w-[100px]">
              COMPRAR
            </button>
            <button className="text-[#9b9b9bf7] flex items-center gap-2 border px-4 py-2 rounded-full">
              <RemoveRedEyeOutlined /> <span className="md:hidden lg:block">Ver</span>
            </button>
          </div>
          {/* Botones visibles en dispositivos móviles */}
          <div className="flex justify-center mt-2 gap-2 md:gap-2">
            <button className="  md:hidden bg-[#DDD6CD] text-white px-4 py-1 rounded-full text-xs w-[100px]">
              COMPRAR
            </button>
            <button className="md:hidden text-[#9b9b9bf7] border px-4 py-2 rounded-full">
              <RemoveRedEyeOutlined />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCompraCard;
