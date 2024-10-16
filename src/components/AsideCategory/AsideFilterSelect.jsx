import { Select, SelectItem } from "@nextui-org/react";
import React from "react";
import { SelectorIcon } from "./SelectorIcon";
import { animals } from "./data";
import { useProducts } from "../../context/ProductsContext";
import "./aside.css"
const AsideFilterSelect = () => {
    const {handleOrdenChange} = useProducts()
  return (
    <Select
    placeholder="Filtrar por"
    labelPlacement="outside"
    className="mt-6 relative !z-0"
    disableSelectorIconRotation
    selectorIcon={<SelectorIcon />}
    onChange={(e) => handleOrdenChange(e.target.value)}
    popperClassName="fixed-menu"
  >
    <SelectItem className="no-truncate !z-0  " value="lowToHigh">
     Precio:Mas bajo
    </SelectItem>
    <SelectItem className="no-truncate !z-0 " value="highToLow">
      Precio:Mas alto
    </SelectItem>
  </Select>
  )
}

export default AsideFilterSelect