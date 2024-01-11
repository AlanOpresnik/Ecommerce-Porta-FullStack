import { Select, SelectItem } from "@nextui-org/react";
import React from "react";
import { SelectorIcon } from "./SelectorIcon";
import { animals } from "./data";
import { Link } from "react-router-dom";

const AsideCategoryDesktop = () => {
  return (
    <div className="hidden md:block sticky top-[222px]">
      <div className="w-[226px]">
        <h4>
          Categoria de Productos / <span className="font-bold">Hogar</span>
        </h4>
      </div>
      <div className="flex flex-col mt-4 gap-2 max-w-[200px] border-b pb-2">
        <Link
          className="hover:text-[#b7b0a8] transition-transform "
          to={"/products/construccion"}
        >
          Construccion
        </Link>
        <Link
          className="hover:text-[#b7b0a8] transition-transform "
          to={"/products/hogar"}
        >
          Casa
        </Link>
        <Link
          className="hover:text-[#b7b0a8] transition-transform "
          to={"/products/hogar/sillas"}
        >
          Sillas
        </Link>
        <Link
          className="hover:text-[#b7b0a8] transition-transform "
          to={"/products/reciclados"}
        >
          Reciclados
        </Link>
      </div>
      <div className="flex flex-col gap-2 ">
        <div className=" max-w-[200px]">
          <p className="mt-7  text-[16px]">Filtrar por precio</p>
        </div>
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            placeholder="desde"
            className="border max-w-[90px] rounded-full bg-[#F4F4F5]  p-2"
          />
          <input
            type="text"
            placeholder="hasta"
            className=" border max-w-[90px] bg-[#F4F4F5] rounded-full p-2"
          />
        </div>
      </div>
    </div>
  );
};

export default AsideCategoryDesktop;
