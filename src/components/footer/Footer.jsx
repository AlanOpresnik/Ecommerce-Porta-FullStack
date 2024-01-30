import React from "react";
import { Link } from "react-router-dom";
import { EmailOutlined, Instagram } from "@mui/icons-material";
import { LocationOnOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";

const Footer = () => {
  return (
    <div className="bg-[#DDD6CD] text-[#9B856E]">
      <div className="border-b border-[#AAAA] ">
        <footer className="flex flex-col  md:items-start md:flex-row  p-12 gap-12 justify-between container ">
          <div className="">
            <h1 className="font-bold text-[24px] newsLetter-heading">
              PETRO FLEX
            </h1>
            <p className="text-sm mt-4">
              Te ofrecemos Productos de Excelente Calidad
            </p>
          </div>
          <div className="flex flex-col ">
            <h4 className="font-bold text-[24px] newsLetter-heading mb-3">
              Categorias
            </h4>
            <nav className="flex flex-col gap-3  text-sm">
              <Link className="hover:text-[#6E6B66]" to={"/"}>
                Inicio
              </Link>
              <Link className="hover:text-[#6E6B66]" to={"/nosotros"}>
                Nuestra historia
              </Link>
              <Link className="hover:text-[#6E6B66]" to={"/productos/hogar"}>
                Productos de hogar
              </Link>
              <Link className="hover:text-[#6E6B66]" to={"/productos/fabrica"}>
                Productos de Fabria
              </Link>
              <Link className="hover:text-[#6E6B66]" to={"/devoluciones"}>
                Cambios y devoluciones
              </Link>
            </nav>
          </div>
          <div className="flex flex-col ">
            <div className="">
              <h4 className="font-bold text-[24px] newsLetter-heading mb-3 ">
                Contactanos
              </h4>
              <EmailOutlined />
              <span className="ml-2">petroflex@gmail.com</span>
            </div>
            <div className="mt-4 flex items-center">
              <LocationOnOutlined />
              <div className="max-w-[320px] flex">
                <span className="ml-2">
                  Norcenter Local 20 - Munro - Buenos Aires. Abierto todos los
                  días de 12 a 20hs.
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col ">
            <div className="">
              <h4 className="font-bold text-[24px] newsLetter-heading mb-2">
                Sigamos conectando
              </h4>
              <Button
                className="rounded-full transition-opacity py-7 h-[60px] w-[20px] "
                variant="contained"
                sx={{
                  backgroundColor: "#9B856F",
                  borderRadius: "9999px",
                  "&:hover": {
                    backgroundColor: "#9B856F", 
                    opacity: 0.7, 
                  },
                }}
              >
                <Instagram sx={{ fontSize: "23px" }} />
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
