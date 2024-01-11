import React from "react";
import InfoDividerCard from "./InfoDividerCard";

const InfoDividerSection = () => {
  return (
    <div>
      <div className="w-full  border-t md:border-b mt-12 ">
        <InfoDividerCard />
      </div>
      <div className="px-4">
        <h5 className="text-[36px]  text-center font-bold mt-[82px]">
          Hacemos de tu casa, tu Hogar
        </h5>
        <p className="text-center text-[16px]">
          "Transformamos espacios en hogares con deco linda a precios ganga."
        </p>
      </div>
    </div>
  );
};

export default InfoDividerSection;
