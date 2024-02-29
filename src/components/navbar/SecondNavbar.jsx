import React from "react";
import { Link } from "react-router-dom";

const SecondNavbar = () => {
  return (
    <div className="w-full  bg-[#fff] h-[50px] border-t relative  hidden md:block">
      <div className="flex justify-evenly relative top-[18px] gap-12  items-center text-sm text-[#AAAAAA] newsLetter-heading font-bold">
        <Link to={"/"}>Inicio</Link>
        <Link to={"/nosotros"}>Nuestra historia</Link>
        <Link to={"/faqs"}>Preguntas frecuentes</Link>
      </div>
    </div>
  );
};

export default SecondNavbar;
