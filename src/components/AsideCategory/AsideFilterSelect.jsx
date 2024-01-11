import { Select, SelectItem } from "@nextui-org/react";
import React from "react";
import { SelectorIcon } from "./SelectorIcon";
import { animals } from "./data";
const AsideFilterSelect = () => {
  return (
    <Select
    placeholder="Filtrar por"
    labelPlacement="outside"
    className=" mt-6 "
    disableSelectorIconRotation
    selectorIcon={<SelectorIcon />}
  >
    {animals.map((animal) => (
      <SelectItem
        className="no-truncate"
        key={animal.value}
        value={animal.value}
      >
        {animal.label}
      </SelectItem>
    ))}
  </Select>
  )
}

export default AsideFilterSelect