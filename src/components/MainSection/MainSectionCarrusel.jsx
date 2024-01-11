import { Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import silla from "../../assets/img/SillaContemporanea_Frankfurt-600x600.png";
import fabrica from "../../assets/img/toilet.jpg";

// Import Swiper styles
import "./carrusel.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

const MainSectionCarrusel = () => {
  return (
    <Swiper
      navigation={true}
      pagination={true}
      modules={[Pagination, Navigation]}
      className="mySwiper h-[550px] mt-12 "
    >
      <SwiperSlide>
        <div
          className="w-[270px], h-[500px] relative mx-2 "
          style={{
            borderRadius: "31px",
          }}
        >
          <img
            src={silla}
            alt="Imagen"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center p-6 text-white"
            style={{
              borderRadius: "31px",
              backgroundColor: "rgba(0, 0, 0, 0.61)",
            }}
          >
            <p className="text-[32px]">HOGAR</p>
            <p className="text-center text-[16px] mb-6">
              transformamos el plástico mediante el sistema de rotomoldeo en
              productos de utilidad para la vida cotidiana, con materias primas
              de óptima calidad creamos las mejores sillas y productos para tu
              hogar
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
            >
              Ver Productos
            </Button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          className="w-[170px], h-[500px] relative"
          style={{
            borderRadius: "31px",
          }}
        >
          <img
            src={fabrica}
            alt="Imagen"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
          <div
            className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center p-6 text-white"
            style={{
              borderRadius: "31px",
              backgroundColor: "rgba(0, 0, 0, 0.61)",
            }}
          >
            <p className="text-[32px]">CONSTRUCCIONES</p>
            <p className="text-center text-[16px] mb-6">
              transformamos el plástico mediante el sistema de rotomoldeo en
              productos de utilidad para la vida cotidiana, con materias primas
              de óptima calidad creamos las mejores sillas y productos para tu
              hogar
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
            >
              Ver Productos
            </Button>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default MainSectionCarrusel;
