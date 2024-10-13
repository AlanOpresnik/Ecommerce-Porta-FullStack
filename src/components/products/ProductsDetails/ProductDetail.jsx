import React, { useEffect, useRef, useState } from "react";
import { useProducts } from "../../../context/ProductsContext";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Pagination, Autoplay } from "swiper/modules";

import "./swiper.css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import ProductDetailAside from "./ProductDetailAside/ProductDetailAside";

const ProductDetail = () => {
  const params = useParams();
  const { prodItems, id } = useProducts();
  const [productFilter, setProductFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(mobile());
  const imageRef = useRef(null); // Referencia de la imagen del Swiper
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);
  const [activeThumb, setActiveThumb] = useState();

  function mobile() {
    return window.matchMedia("(max-width: 640px)").matches;
  }

  useEffect(() => {
    const handleResize = () => setIsMobile(mobile());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const filteredProducts = prodItems.filter(
      (product) => product._id == params.id
    );
    setProductFilter(filteredProducts);
    setLoading(false);
  }, [id, params, prodItems]);

  if (loading) {
    return (
      <div className="mt-40 flex justify-center">
        <span className="loader"></span>
      </div>
    );
  }

  return  (
    <>
      {isMobile
        ? productFilter.map((product) => (
          <section
            key={product._id}
            className="text-gray-600 flex justify-center body-font mt-6 overflow-hidden"
          >
            <div className=" flex justify-start md:justify-center px-2 pb-6 md:py-24 ">
              <div className="lg:w-full  grid grid-cols-1 sm:grid-cols-2">
                <div className=" w-full justify-center flex-col mb-2">
                  <Swiper
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: true,
                    }}
                    spaceBetween={10}
                    navigation={{
                      prevEl: ".custom-swiper-button-prev",
                      nextEl: ".custom-swiper-button-next",
                    }}
                    modules={[Pagination, Navigation, Autoplay]}
                    className="mySwiper2 w-full md:w-[400px] lg:w-[600px] md:mt-0"
                  >
                    {product.images && product.images.length > 0 ? (
                      product.images.map((image, index) => (
                        <SwiperSlide className="w-full" key={index}>
                          <img
                             ref={index === 0 ? imageRef : null}
                            src={image.secure_url}
                            alt={product.name}
                            className="w-full lg:h-[420px] h-[350px] md:object-cover rounded-sm object-center"
                          />
                        </SwiperSlide>
                      ))
                    ) : (
                      <SwiperSlide className="w-full">
                        <img
                          src="/no-image.jpg"
                          alt="Imagen no disponible"
                          className="w-full lg:h-[420px] h-[350px] md:object-cover object-center"
                        />
                      </SwiperSlide>
                    )}
                    <div className="swiper-button-prev custom-swiper-button-prev"></div>
                    <div className="swiper-button-next custom-swiper-button-next"></div>
                  </Swiper>

                </div>
                <ProductDetailAside product={product} imageRef={imageRef} />
              </div>
            </div>
          </section>
        ))
        : productFilter.map((product) => (
          <section
            key={product._id}
            className="text-gray-600 max-w-[1280px] mx-auto  body-font mt-6 overflow-hidden"
          >
            <div className="md:mt-24 mb-12">
              <div className=" md:flex gap-6 px-4">
                <div className="flex justify-center flex-col">
                <Swiper
                    spaceBetween={10}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: true,
                    }}
                    loop
                    navigation={{
                      prevEl: ".custom-swiper-button-prev",
                      nextEl: ".custom-swiper-button-next",
                    }}
                    thumbs={{ swiper: activeThumb }}
                    modules={[Navigation, Thumbs]}
                    className="mySwiper2  w-full md:w-[400px] lg:w-[600px] md:mt-0"
                  >
                    {product.images && product.images.length > 0 ? (
                      product.images.map((image, index) => (
                        <SwiperSlide className="w-full" key={index}>
                          <img
                            src={image.secure_url}
                            alt={product.name}
                            ref={index === 0 ? imageRef : null}
                            className="w-full lg:h-[420px] h-[350px]  rounded-xl object-center"
                          />
                        </SwiperSlide>
                      ))
                    ) : (
                      <SwiperSlide className="w-full">
                        <img
                          src="/no-image.jpg"
                          alt="Imagen no disponible"
                          className="w-full lg:h-[420px] h-[350px] md:object-cover object-center"
                        />
                      </SwiperSlide>
                    )}
                    <div className="swiper-button-prev custom-swiper-button-prev"></div>
                    <div className="swiper-button-next custom-swiper-button-next"></div>
                  </Swiper>

                  <Swiper
                    onClick={setActiveThumb}
                    spaceBetween={10}
                    slidesPerView={3}
                    pagination
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: true,
                    }}
                    loop={true}
                    modules={[Navigation, Thumbs]}
                    className="mySwiper2  h-[160px] w-full"
                  >
                    <div className='hidden md:block  '>


                      {product.images && product.images.length > 0 ? (
                        product.images.map((image, index) => (
                          <SwiperSlide className="max-w-[120px] mt-3" key={index}>
                            <img
                              src={
                                image.secure_url
                              }
                              
                              alt={product.name}
                              className='md:w-[90px] hover:opacity-65 lg:w-[120px] cursor-pointer h-[80px]'
                              onClick={() => handleThumbnailClick(index)}
                            />
                          </SwiperSlide>
                        ))) : (
                        <SwiperSlide className="w-full">
                          <img
                            src="/no-image.jpg"
                            alt="Imagen no disponible"
                            className="w-full lg:h-[420px] mt-4 h-[350px] md:object-cover object-center"
                          />
                        </SwiperSlide>
                      )}
                    </div>
                  </Swiper>
                </div>
                <ProductDetailAside product={product} imageRef={imageRef} />
              </div>
            </div>
          </section>
        ))}
    </>
  );
};

export default ProductDetail;
