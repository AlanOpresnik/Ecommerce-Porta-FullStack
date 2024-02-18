import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import React from 'react'

const DropDownCategorys = ({ onSelectCategory }) => { // Recibe onSelectCategory como prop
    const handleCategorySelect = (category) => {
        onSelectCategory(category); // Llama a la función onSelectCategory con la categoría seleccionada
    };

    return (
        <div className='w-[100px]'>
            <Dropdown className='w-[50px]'>
                <DropdownTrigger className='w-[100px] px-2'>
                    <Button variant="bordered">Ver categorias</Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    <DropdownItem onClick={() => handleCategorySelect("")} key="copy">
                        Todas
                    </DropdownItem>
                    <DropdownItem onClick={() => handleCategorySelect("construccion")} key="new">
                        Construcción
                    </DropdownItem>
                    <DropdownItem onClick={() => handleCategorySelect("hogar")} key="copy">
                        Hogar
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};
export default DropDownCategorys