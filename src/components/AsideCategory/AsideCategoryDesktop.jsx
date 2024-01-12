import React from "react";
import { Link, useLocation } from "react-router-dom";

const AsideCategoryDesktop = ({ category }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="hidden md:block sticky top-[222px]">
      <div className="w-[226px]">
        <h4>
          Categoria / <span className="font-bold">{category}</span>
        </h4>
      </div>
      <div className="flex flex-col mt-4 gap-2 max-w-[200px] border-b pb-2">
        <Link
          className={`${
            currentPath === "/products/construccion" ? "text-[#b7b0a8] font-bold" : ""
          } hover:text-[#b7b0a8] transition-transform`}
          to={"/products/construccion"}
        >
          Construccion
        </Link>
        <Link
          className={`${
            currentPath === "/products/hogar" ? "text-[#b7b0a8] font-bold" : ""
          } hover:text-[#b7b0a8] transition-transform`}
          to={"/products/hogar"}
        >
          Hogar
        </Link>
        <Link
          className={`${
            currentPath === "/products/hogar/sillas"? "text-[#b7b0a8] font-bold" : ""
          } hover:text-[#b7b0a8] transition-transform`}
          to={"/products/hogar/sillas"}
        >
          Sillas
        </Link>
        <Link
          className={`${
            currentPath === "/products/reciclados" ? "text-[#b7b0a8] font-bold" : ""
          } hover:text-[#b7b0a8] transition-transform`}
          to={"/products/reciclados"}
        >
          Reciclados
        </Link>
      </div>
      <div className="flex flex-col gap-2 ">
        <div className="max-w-[200px]">
          <p className="mt-7 text-[16px]">Filtrar por precio</p>
        </div>
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            placeholder="desde"
            className="border max-w-[90px] rounded-full bg-[#F4F4F5] p-2"
          />
          <input
            type="text"
            placeholder="hasta"
            className="border max-w-[90px] bg-[#F4F4F5] rounded-full p-2"
          />
        </div>
      </div>
    </div>
  );
};

export default AsideCategoryDesktop;
