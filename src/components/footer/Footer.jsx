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
              PORTAFLEX
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
              <span className="ml-2">info@portaflex.com.ar</span>
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
              <h4 className="font-bold text-[24px] newsLetter-heading mb-6">
                Sigamos conectados
              </h4>
              <a
                href="https://www.instagram.com/portaflexargentina/?igsh=MWJidDYxOTRrdG1zcg%3D%3D"
                className="bg-[#9B856F] hover:bg-[#a79686] transition-background p-4 px-4 rounded-full" 
              target="_BLANK"
              >
                <Instagram sx={{ fontSize: "23px", color:"white" }} />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
