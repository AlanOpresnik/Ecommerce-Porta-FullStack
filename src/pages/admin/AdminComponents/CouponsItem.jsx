import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Chip } from "@nextui-org/react";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import cuponLogo from "../../../assets/img/cupon.png"
import { Button } from "@mui/material";
import ModalCouponDelete from "./coupons/ModalCouponDelete";
import { formatearFecha } from "../ordenes/formatearFecha";
import { useProducts } from "../../../context/ProductsContext";
export default function CouponsItem({ coupon }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { deleteCupon } = useProducts()

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    return (
        <Card className="max-w-[400px]">
            <CardHeader className="flex  gap-3">
                <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src={cuponLogo}
                    width={40}
                />
                <div className="flex flex-col">
                    <p className="text-md">{coupon.key}</p>
                    <div className="flex justify-between gap-6">
                        <p className="text-small flex gap-2 text-default-500">Cupon </p>
                        <Chip className="text-white text-center absolute top-3 right-4 font-bold text-sm bg-[#82ba82]">Activo</Chip>
                    </div>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <p className="flex gap-1 flex-wrap">Este cupon hace un descuento de <p className="font-bold">${coupon.value} pesos</p> </p>
                <p className="flex gap-2 mt-4 flex-wrap">Este cupon vence el: <p className="font-bold">{formatearFecha(coupon.expired)}</p></p>
            </CardBody>
            <Divider />
            <CardFooter>
                <Button
                    onClick={handleOpenModal}
                    sx={{
                        color: '#bf3737',
                        paddingY: "2px",
                    }}
                > Eliminar cupon
                </Button>
            </CardFooter>
            <ModalCouponDelete
                open={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={() => {
                    handleCloseModal();
                    deleteCupon(coupon._id);
                    console.log(coupon._id)
                }}
                cuponTitle={coupon.key}
            />
        </Card>

    );
}
