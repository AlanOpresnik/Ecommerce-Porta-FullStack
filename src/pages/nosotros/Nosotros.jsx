import React, { useEffect } from "react";
import ilustracion1 from "../../assets/img/ilustracion1.webp";
import ScrollReveal from 'scrollreveal';
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

const Nosotros = () => {
  useEffect(() => {
    const sr = ScrollReveal();
    sr.reveal(".familia", {
      duration: 1000,
      distance: "50px",
    });
    const sr2 = ScrollReveal();
    sr.reveal(".especialistas", {
      duration: 2000,
      distance: "50px",
      origin: "left",
      delay: 500,
    });
  }, []);

  return (
    <section className="text-gray-600 body-font mt-[5rem] md:mt-[5rem] max-w-[1250px] overflow-hidden">
      <div className="familia border-b-2 container mx-auto flex px-5 py-6 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-6 items-center text-center">
          <h3 className="title-font border-b-2 border-[#a7967f] w-fit sm:text-4xl text-4xl mb-4 font-medium text-gray-900">
            ¿Quienes Somos?
          </h3>
          <p className="mb-8 leading-relaxed">
            En <span className="text-[#a7967f] font-semibold">Portaflex</span>,
            nos enorgullece ofrecer una experiencia única en la elaboración de
            Productos de hogar y construccion, fusionando calidad excepcional y precios
            asequibles. Nos especializamos en la confección de productos
            utilizando Plastico elaborado y fundido, metales, asegurando un
            equilibrio perfecto entre precio y calidad. Con un compromiso
            arraigado en la artesanía, cada uno de nuestros productos refleja la
            dedicación y la habilidad de nuestros trabajadores.
          </p>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 flex justify-center ">
          <img
            className="object-cover object-center rounded-lg h-[400px] md:h-[550px]"
            alt="hero"
            src={ilustracion1}
          />
        </div>
      </div>
      <div className="especialistas border-b-2 container mx-auto px-5 py-6 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-16">
          <img
            className="object-cover object-center rounded-lg h-[400px] md:h-[550px] w-full"
            alt="hero"
            src={ilustracion1}
          />
        </div>

        <div className="lg:w-1/2 lg:text-left text-center">
          <p className="title-font border-b-2 pb-4 border-[#a7967f] w-fit sm:text-[1.98rem] text-4xl mb-4 font-medium text-gray-900">
            Estamos recomendados por especialistas
          </p>
          <p className="mb-8 leading-relaxed">
            En <span style={{
                fontSize: "16px"
            }} className="text-[#a7967f] font-semibold">Portaflex</span>,
            nos enorgullece ofrecer una experiencia única en la elaboración de
            Productos de hogar y construccion, fusionando calidad excepcional y precios
            asequibles. Nos especializamos en la confección de productos
            utilizando Plastico elaborado y fundido, metales, asegurando un{" "}
            <span className="text-[#a7967f] font-semibold">
              Equilibrio perfecto
            </span>{" "}
             entre precio y calidad. Con un compromiso
            arraigado en la artesanía, cada uno de nuestros productos refleja la
            dedicación y la habilidad de nuestros trabajadores.
          </p>
        </div>
      </div>
     
    </section>
  );
};

export default Nosotros;