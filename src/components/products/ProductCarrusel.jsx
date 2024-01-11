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

const prodItems = [
  {
    id: 1,
    img: prod2,
    title: "Silla para casa con tremendo color blanco",
    price: "125.000,00",
  },
  {
    id: 2,
    img: prod3,
    title: "Silla para casa con tremendo color blanco",
    price: "125.000,00",
  },
  {
    id: 3,
    img: prod3,
    title: "Silla para casa con tremendo color blanco",
    price: "125.000,00",
  },
  {
    id: 4,
    img: prod2,
    title: "Silla para casa con tremendo color blanco",
    price: "125.000,00",
  },
  {
    id: 5,
    img: prod,
    title: "Silla para casa con tremendo color blanco",
    price: "125.000,00",
  },
];
const breakpoints = {
  320: {
    slidesPerView: 1.1,
  },
  400: {
    slidesPerView: 1.2,
  },
  465: {
    slidesPerView: 1.3,
  },
  500: {
    slidesPerView: 1.4,
  },
  550: {
    slidesPerView: 1.6,
  },
  590: {
    slidesPerView: 1.7,
  },
  610: {
    slidesPerView: 1.8,
  },
  650: {
    slidesPerView: 1.9,
  },
  670: {
    slidesPerView: 2,
  },
  700: {
    slidesPerView: 2.2,
  },
  750: {
    slidesPerView: 2.3,
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
  return (
    <Swiper
      navigation={true}
      pagination={true}
      breakpoints={breakpoints}
      modules={[Pagination, Navigation]}
      className="mySwiper max-w-full h-[620px] md:h-[600px]"
    >
      <div className="">
        {prodItems.map((prod, index) => (
          <SwiperSlide key={prod.id}>
            <ProductCards prod={prod} index={index} />
          </SwiperSlide>
        ))}
      </div>
    </Swiper>
  );
};

export default ProductCarrusel;
