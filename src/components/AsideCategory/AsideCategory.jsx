import React, { useState } from "react";
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  Select,
  SelectItem,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { SelectorIcon } from "./SelectorIcon";
import { animals } from "./data";
import "./aside.css";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext";

const AsideCategory = () => {
  const navigate = useNavigate();
  const {handleOrdenChange} = useProducts()
  return (
    <>
      <div className="flex justify-between gap-6 items-center md:hidden py-2 ">
        <Select
          placeholder="Ordenar por"
          labelPlacement="outside"
          className=" mt-6 "
          disableSelectorIconRotation
          selectorIcon={<SelectorIcon />}
          onChange={(e) => handleOrdenChange(e.target.value)}
        >
          <SelectItem className="no-truncate" value="lowToHigh">
            Mas bajo
          </SelectItem>
          <SelectItem className="no-truncate" value="highToLow">
             Mas alto
          </SelectItem>
        </Select>
        <div className="flex items-center gap-2 md:hidden">
          <div>
            <p className="mt-7 text-center text-[16px]">Precio</p>
          </div>
          <div className="flex gap-2 mt-7">
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

      <div className="flex justify-end mt-6">
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered">Ver categorias</Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem
              onClick={() => navigate("/products/construccion ")}
              key="new"
            >
              Construccion
            </DropdownItem>
            <DropdownItem
              onClick={() => navigate("/products/hogar")}
              key="copy"
            >
              Hogar
            </DropdownItem>
            <DropdownItem
              onClick={() => navigate("/products/hogar/sillas")}
              key="edit"
            >
              Sillas
            </DropdownItem>
            <DropdownItem
              onClick={() => navigate("/products/reciclados")}
              key="delete"
            >
              Reciclados
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </>
  );
};

export default AsideCategory;
