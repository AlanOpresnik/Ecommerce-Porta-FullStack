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
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext";

const AsideCategory = () => {
  const { categorys } = useProducts()
  const location = useLocation();
  const currentPath = location.pathname;
  const params = useParams()
  console.log(params)
  const navigate = useNavigate();
  const { handleOrdenChange } = useProducts();
  const filteredCategories = categorys?.filter(category => (
    category.category === params.category &&
    category.subcategoryId?.category !== "Construcción"
  )) || [];
  return (
    <>
      <div className="flex justify-between gap-6 items-center md:hidden py-2 ">
        <Select
          placeholder="Ordenar por"
          labelPlacement="outside"
          className=" mt-6 text-xs no-truncate "
          disableSelectorIconRotation
          selectorIcon={<SelectorIcon />}
          onChange={(e) => handleOrdenChange(e.target.value)}
        >
          <SelectItem className="no-truncate text-xs " value="lowToHigh">
            Mas bajo
          </SelectItem>
          <SelectItem className="no-truncate text-xs" value="highToLow">
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
              className="border max-w-[70px] rounded-full bg-[#F4F4F5]  p-1"
            />
            <input
              type="text"
              placeholder="hasta"
              className=" border max-w-[70px] bg-[#F4F4F5] rounded-full p-1"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center">
          <h4 className="text-[16px]">Categoria / </h4>
          <p className="ml-2 font-semibold">{params.category}</p>
        </div>

        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered">Ver categorias</Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
          <DropdownItem
                onClick={() => navigate(`/products/${params.category}`)}
                key="new"
              >
                {"Todas"}
              </DropdownItem>
            {filteredCategories.map((category => (
              <DropdownItem
                onClick={() => navigate(`/products/${category.category}/${category.name.replace(/\s+/g, '-')}`)}
                key="new"
              >
                {category.name}
              </DropdownItem>
            )))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </>
  );
};

export default AsideCategory;
