import React, { useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Chip } from "@nextui-org/react";
import cuponLogo from "../../../../assets/img/cupon.png";
import { Button } from "@mui/material";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ModalCouponDelete from "../coupons/ModalCouponDelete";
import { useProducts } from "../../../../context/ProductsContext";
import ModalCpDelte from './ModalCpDelte';
const CpItem = ({ cp }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { deleteCp } = useProducts()
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    console.log(cp)
    return (
        cp.key === 9999 ? (
            <></>
        ) : (
            <Card className="max-w-[400px]">
                <CardHeader className="flex  gap-3">
                    <LocalShippingIcon fontSize='large' className=' p-1 ' />
                    <div className="flex flex-col">
                        <p className="text-md">{cp.key}</p>
                        <div className="flex justify-between gap-6">
                            <p className="text-small flex gap-2 text-default-500">Codigo postal </p>
                            <Chip className="text-white text-center absolute top-3 right-4 font-bold text-sm bg-[#82ba82]">Activo</Chip>
                        </div>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <p className="flex gap-1 flex-wrap"> codigo postal de la localidad: <p className="font-bold">{cp.location}</p> </p>
                    <p className="flex gap-2 mt-4 flex-wrap">Este codigo postal tiene un valor de envio <p className="font-bold">{cp.price}</p></p>
                </CardBody>
                <Divider />
                <CardFooter>
                    <Button
                        onClick={handleOpenModal}
                        sx={{
                            color: '#bf3737',
                            paddingY: "2px",
                        }}
                    > Eliminar codigo postal
                    </Button>
                </CardFooter>
                <ModalCpDelte
                    open={isModalOpen}
                    onClose={handleCloseModal}
                    onConfirm={() => {
                        handleCloseModal();
                        deleteCp(cp._id);
                        console.log(cp._id)
                    }}
                    cpTitle={cp.key}
                />
            </Card>
        )
    )
}

export default CpItem