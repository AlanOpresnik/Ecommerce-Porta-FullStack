import { useState } from "react";
import prod from "../../assets/img/prod.webp";
import prod2 from "../../assets/img/prod2.jpeg";
import prod3 from "../../assets/img/prod3.jpeg";
import ProductCards from "./ProductCards";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "./carrusel.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { useProducts } from "../../context/ProductsContext";

const breakpoints = {
  320: {
    slidesPerView: 1.2,
  },
  350: {
    slidesPerView: 1.4,
  },
  400: {
    slidesPerView: 1.5,
  },
  455: {
    slidesPerView: 1.7,
  },
  500: {
    slidesPerView: 2.1,
  },
  550: {
    slidesPerView: 2.2,
  },
  590: {
    slidesPerView: 2.3,
  },
  610: {
    slidesPerView: 2.4,
  },
  650: {
    slidesPerView: 2.6,
  },
  670: {
    slidesPerView: 2.7,
  },
  700: {
    slidesPerView: 2.8,
  },
  750: {
    slidesPerView: 2.9,
  },
  768: {
    slidesPerView: 2.4,
  },
  788: {
    slidesPerView: 2.4,
  },
  820: {
    slidesPerView: 2.5,
  },
  850: {
    slidesPerView: 2.6,
  },
  920: {
    slidesPerView: 2.8,
  },
  980: {
    slidesPerView: 3.1,
  },
  1024: {
    slidesPerView: 3.3,
  },
  1160: {
    slidesPerView: 3.6,
  },
  1220: {
    slidesPerView: 3.7,
  },
  1280: {
    slidesPerView: 3.8,
  },
  1320: {
    slidesPerView: 3.9,
  },
  1390: {
    slidesPerView: 4,
  },
};

const ProductCarrusel = () => {
  const {prodItems} = useProducts()
  return (
    <Swiper
      navigation={true}
      pagination={true}
      breakpoints={breakpoints}
      modules={[Pagination, Navigation]}
      className="mySwiper max-w-full h-[620px] md:h-[600px]"
    >
      {prodItems.length > 1 ? (
      <div className="">
        {prodItems?.map((prod, index) => (
          <SwiperSlide key={prod.id}>
            <ProductCards prod={prod} index={index} />
          </SwiperSlide>
        ))}
      </div>
      ):"cargando..."}
    </Swiper>
  );
}

export default ProductCarrusel;
