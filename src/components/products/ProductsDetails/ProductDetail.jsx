import React, { useEffect, useRef, useState } from "react";
import { useProducts } from "../../../context/ProductsContext";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  FreeMode,
  Navigation,
  Thumbs,
  Pagination,
  Autoplay,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

// import required modules

const ProductDetail = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const params = useParams();
  const { prodItems, id, addToCart } = useProducts();
  const [productFilter, setProductFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(mobile());
  const [mainSwiper, setMainSwiper] = useState(null);

  const swiperRef = useRef(null); // Referencia al Swiper

  // Controlador de eventos para cuando se completa la transición de cambio de slide
  const handleSlideChangeTransitionEnd = () => {
    // Verifica si el Swiper ha alcanzado el último slide
    if (
      swiperRef.current &&
      swiperRef.current.swiper &&
      swiperRef.current.swiper.isEnd
    ) {
      // Si es el último slide, pausa el autoplay
      swiperRef.current.swiper.autoplay.stop();
    }
  };

  const handleThumbnailClick = (index) => {
    if (mainSwiper !== null) {
      mainSwiper.slideTo(index); // Cambia a la imagen seleccionada en el swiper principal
    }
  };
  function mobile() {
    return window.matchMedia("(max-width: 640px)").matches;
  }

  useEffect(() => {
    function handleResize() {
      setIsMobile(mobile());
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const filteredProducts = prodItems.filter(
      (product) => product._id == params.id
    );
    setProductFilter(filteredProducts);
    console.log(filteredProducts);
    setLoading(false);
  }, [id, params, prodItems]);

  if (loading) {
    return <p className="mt-24">Cargando...</p>;
  }

  return (
    <>
      {isMobile
        ? productFilter.map((product) => (
            <section
              key={product._id}
              className="text-gray-600 flex justify-center body-font mt-6 overflow-hidden"
            >
              <div className="container flex justify-start md:justify-center  px-5 pt-3 pb-6 md:py-24 ">
                <div className="lg:w-full  grid grid-cols-1 sm:grid-cols-2">
                  <div className="flex w-full justify-center flex-col">
                    <Swiper
                      autoplay={{
                        delay: 2500,
                        disableOnInteraction: true,
                      }}
                      spaceBetween={10}
                      navigation={true}
                      pagination={true}
                      modules={[Pagination, Navigation, Autoplay]}
                      className="mySwiper2 w-full h-[395px]  sm:w-[280px] md:w-[320px] lg:w-[480px] sm:mr-24  col-span-1"
                    >
                      {product.images?.map((image) => (
                        <SwiperSlide className="w-full" key={image.filename}>
                          <img
                            src={
                              import.meta.env.VITE_ENDPOINT_IMAGES +
                              image.filename
                            }
                            alt={product.name}
                            className=" w-full lg:h-[420px]  h-[350px] md:object-cover object-center rounded-xl"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                  <div className="max-w-[500px] col-span-1 lg:pl-10 lg:py-6 mt-2 lg:mt-0">
                    <h2 className="text-sm title-font mb-1 text-gray-500 tracking-widest">
                      {product.category}
                    </h2>

                    <h1 className="text-gray-900 text-3xl  title-font font-medium mb-1">
                      {product.name}
                    </h1>

                    <div className="flex mb-4">
                      <span className="flex items-center">
                        {[...Array(5)].map((_, index) => (
                          <svg
                            key={index}
                            fill="currentColor"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4 text-[#f6d8af]"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                          </svg>
                        ))}
                        <span className="text-gray-600 ml-3">4 Reviews</span>
                      </span>
                      <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                        <a className="text-gray-500">
                          <svg
                            fill="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                          </svg>
                        </a>
                        <a className="text-gray-500">
                          <svg
                            fill="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                          </svg>
                        </a>
                        <a className="text-gray-500">
                          <svg
                            fill="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                          </svg>
                        </a>
                      </span>
                    </div>
                    <p className="leading-relaxed">{product.description}</p>
                    <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5"></div>
                    <div className="flex">
                      <span className=" font-medium text-2xl text-gray-900">
                        ${product.price}
                      </span>
                      <button
                        onClick={() => addToCart(product)}
                        className="flex ml-auto text-white bg-[#dbcdbc] border-0 py-2 px-6 focus:outline-none hover:bg-[#cbc2b6] rounded"
                      >
                        Agregar al carrito
                      </button>
                      <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                        <svg
                          fill="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))
        : productFilter.map((product) => (
            <section
              key={product._id}
              className="text-gray-600 flex justify-center body-font mt-6 overflow-hidden"
            >
              <div className="container flex justify-center px-5 pt-3 pb-6 md:py-24">
                <div className="lg:w-full grid grid-cols-1 sm:grid-cols-2">
                  <div className="flex justify-center flex-col">
                    <Swiper
                      spaceBetween={10}
                      autoplay={{
                        delay: 2500,
                        disableOnInteraction: true,
                      }}
                      loop
                      navigation={true}
                      thumbs={{ Swiper: thumbsSwiper }}
                      modules={[Autoplay, Navigation, Thumbs]}
                      className="mySwiper2 w-full sm:w-[280px] md:w-[320px] lg:w-[480px] sm:mr-24 col-span-1"
                    >
                      {product.images?.map((image, index) => (
                        <SwiperSlide key={index}>
                          <img
                            src={
                              import.meta.env.VITE_ENDPOINT_IMAGES +
                              image.filename
                            }
                            alt={product.name}
                            className="w-full lg:h-[420px] h-[350px] md:object-cover object-center rounded-xl"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <Swiper
                      onSwiper={setThumbsSwiper}
                      spaceBetween={10}
                      slidesPerView={3}
                      autoplay={{
                        delay: 2500,
                        disableOnInteraction: true,
                      }}
                      loop={true}
                      modules={[Autoplay]}
                      freeMode={true}
                      watchSlidesVisibility={true}
                      watchSlidesProgress={true}
                      onSlideChangeEnd={(swiper) => {
                        if (swiper.isEnd) {
                          swiper.autoplay.stop(); // Detener la reproducción automática al llegar al final
                        }
                      }}
                      className="mySwiper2 w-full lg:w-[520px]"
                    >
                      <div className="flex justify-center items-center">
                        {product.images.map((image, index) => (
                          <SwiperSlide key={index}>
                            <img
                              src={
                                import.meta.env.VITE_ENDPOINT_IMAGES +
                                image.filename
                              }
                              alt={product.name}
                              className="w-[100px] h-[100px] mt-2"
                              onClick={() => handleThumbnailClick(index)}
                            />
                          </SwiperSlide>
                        ))}
                      </div>
                    </Swiper>
                  </div>
                  <div className="max-w-[500px] col-span-1 lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                    <h2 className="text-sm title-font mb-1 text-gray-500 tracking-widest">
                      {product.category}
                    </h2>

                    <h1 className="text-gray-900 text-3xl  title-font font-medium mb-1">
                      {product.name}
                    </h1>

                    <div className="flex mb-4">
                      <span className="flex items-center">
                        {[...Array(5)].map((_, index) => (
                          <svg
                            key={index}
                            fill="currentColor"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4 text-[#f6d8af]"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                          </svg>
                        ))}
                        <span className="text-gray-600 ml-3">4 Reviews</span>
                      </span>
                      <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                        <a className="text-gray-500">
                          <svg
                            fill="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                          </svg>
                        </a>
                        <a className="text-gray-500">
                          <svg
                            fill="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                          </svg>
                        </a>
                        <a className="text-gray-500">
                          <svg
                            fill="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                          </svg>
                        </a>
                      </span>
                    </div>
                    <p className="leading-relaxed">{product.description}</p>
                    <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5"></div>
                    <div className="flex">
                      <span className=" font-medium text-2xl text-gray-900">
                        ${product.price}
                      </span>
                      <button
                        onClick={() => addToCart(product)}
                        className="flex ml-auto text-white bg-[#dbcdbc] border-0 py-2 px-6 focus:outline-none hover:bg-[#cbc2b6] rounded"
                      >
                        Agregar al carrito
                      </button>
                      <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                        <svg
                          fill="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
    </>
  );
};

export default ProductDetail;
