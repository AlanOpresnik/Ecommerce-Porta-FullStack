import { Select, SelectItem } from "@nextui-org/react";
import React from "react";
import { SelectorIcon } from "./SelectorIcon";
import { animals } from "./data";
import { useProducts } from "../../context/ProductsContext";
const AsideFilterSelect = () => {
    const {handleOrdenChange} = useProducts()
  return (
    <Select
    placeholder="Filtrar por"
    labelPlacement="outside"
    className=" mt-6 "
    disableSelectorIconRotation
    selectorIcon={<SelectorIcon />}
    onChange={(e) => handleOrdenChange(e.target.value)}
  >
    <SelectItem className="no-truncate" value="lowToHigh">
     Precio: Mas bajo
    </SelectItem>
    <SelectItem className="no-truncate" value="highToLow">
      Precio: Mas alto
    </SelectItem>
  </Select>
  )
}

export default AsideFilterSelect