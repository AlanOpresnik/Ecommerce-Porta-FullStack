import React from "react";
import silla from "../../assets/img/SillaContemporanea_Frankfurt-600x600.png";
import fabrica from "../../assets/img/toilet.jpg";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const MainSectionCard = () => {
  const navigate = useNavigate()
  return (
    <div className="flex justify-center items-center gap-12 mt-24">
      <div
        className="w-[170px], h-[500px] relative"
        style={{
          borderRadius: "31px",
        }}
      >
        <img
          src={silla}
          alt="Imagen"
          style={{ width: "700px", height: "100%", objectFit: "contain" }}
        />
        <div
          className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-white p-12"
          style={{
            borderRadius: "31px",
            backgroundColor: "rgba(0, 0, 0, 0.61)",
          }}
        >
          <p className="text-[32px] opacity-100  font-bold">HOGAR</p>
          <p className="text-center opacity-100  text-[16px] mb-6">
            transformamos el plástico mediante el sistema de rotomoldeo en
            productos de utilidad para la vida cotidiana, con materias primas de
            óptima calidad creamos las mejores sillas y productos para tu hogar
          </p>
          <Button
            sx={{
              backgroundColor: "white",
              color: "black",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#efefef",
              },
            }}
            variant="contained"
            onClick={() => navigate(`/products/hogar`)}
          >
            Ver Productos
          </Button>
        </div>
      </div>

      <div
        className="w-[170px], h-[500px] relative"
        style={{
          borderRadius: "31px",
        }}
      >
        <img
          src={fabrica}
          alt="Imagen"
          style={{ width: "700px", height: "500px", objectFit: "contain" }}
        />
        <div
          className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center p-12 text-white"
          style={{
            borderRadius: "31px",
            backgroundColor: "rgba(0, 0, 0, 0.61)",
          }}
        >
          <p className="text-[32px] opacity-100  font-bold">CONSTRUCCIONES</p>
          <p className="text-center opacity-100  text-[16px] mb-6">
            transformamos el plástico mediante el sistema de rotomoldeo en
            productos de utilidad para la vida cotidiana, con materias primas de
            óptima calidad creamos las mejores sillas y productos para tu hogar
          </p>
          <Button
            sx={{
              backgroundColor: "white",
              color: "black",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#efefef",
              },
            }}
            variant="contained"
            onClick={() => navigate(`/products/construccion`)}
          >
            Ver Productos
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainSectionCard;
