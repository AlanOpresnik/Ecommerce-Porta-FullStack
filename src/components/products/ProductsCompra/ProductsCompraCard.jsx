import React, { useState } from "react";
import RemoveRedEyeOutlined from "@mui/icons-material/RemoveRedEyeOutlined";
import { useProducts } from "../../../context/ProductsContext";
import formatProductName from "../../../helpers/formatProductName";

const ProductCompraCard = ({ prod, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredImage, setHoveredImage] = useState('');

  const { handleRedirect } = useProducts();

  const handleMouseEnter = () => {
    if (prod && prod.images && prod.images.length > 1) {
      setHoveredImage(prod.images[1].secure_url);
    }
  };

  const handleMouseLeave = () => {
    if (prod && prod.images && prod.images.length > 0) {
      setHoveredImage(prod.images[0].secure_url);
    } else {
      setHoveredImage('/no-image.jpg');
    }
  };

  return (
    <div>
      <div
        key={prod._id}
        className={`w-[175px] sm:w-[170px] md:w-[170px] md:h-[400px] lg:w-[235px]  cursor-pointer h-auto border rounded-[20px] relative overflow-hidden transition-all ease-in-out duration-300 ${isHovered ? "h-auto md:!h-[449px]" : ""
          }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() =>
          handleRedirect(prod._id, prod.subcategoryId.category, formatProductName(prod.subcategoryId.name), formatProductName(prod.name))
        }
      >
        <div className="border-b-4 h-[260px] md:h-[260px] relative">
          <img
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            src={hoveredImage || (prod.images && prod.images.length > 0
              ? prod.images[0].secure_url
              : '/no-image.jpg'
            )}
            className={`h-full  w-full rounded-t-[20px] ${isHovered ? 'animate-fadeInOut' : 'animate-fadeIn'}`}
            alt="product"
            loading="lazy"
          />
        </div>
        <div className="text-center relative p-3">
          <p className="line-clamp-2 font-bold">{prod.name}</p>
          <p className="font-bold text-2xl text-[#ddd6cd]">${prod.price}</p>{" "}
          <p className="text-sm">
            <strong>{3}</strong> Cuotas sin interés de{" "}
            <strong>$3.200,00</strong>
          </p>
          <div
            className={`hidden md:flex gap-4 items-center justify-center md:absolute lg:relative lg:bottom-0 md:bottom-[-29px] md:left-[6px] lg:left-0 lg:mt-1 opacity-0 ${isHovered ? "opacity-100" : ""
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
            <button className="md:hidden bg-[#DDD6CD] text-white px-4 py-1 rounded-full text-xs w-[100px]">
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
