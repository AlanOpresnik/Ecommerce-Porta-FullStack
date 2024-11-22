import React from "react";

const NewsLetter = () => {
  return (
    <div className="h-[370px] flex flex-col items-center justify-center text-center gap-12 leading-9 ">
      <div className="flex flex-col gap-5 ">
        <p className="newsLetter-heading">NEWSLETTER</p>
        <p className="text-[34px] newsLetter-heading font-bold ">
          Recibi todas las ofertas
        </p>
        <p className="newsLetter-heading text-[12px]">
          ¿Quieres recibir nuestras ofertas? ¡Registrate ya mismo y comenzá a
          disfrutarlas!
        </p>
      </div>
      <div className="relative w-full md:w-[700px] lg:w-[800px]">
        <input
          type="text"
          placeholder="Email"
          className="w-full md:w-[700px] lg:w-[800px] p-3 rounded-xl pr-10"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="absolute w-8 h-8 top-1/2 right-4 transform -translate-y-1/2 text-[#9C9C9C]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
          />
        </svg>
      </div>
    </div>
  );
};

export default NewsLetter;
