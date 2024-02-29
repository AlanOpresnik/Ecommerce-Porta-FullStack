import React, { useState } from "react";
import { useProducts } from "../../../../../context/ProductsContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { RemoveRedEyeOutlined } from "@mui/icons-material";

const ProductsMatch = () => {
  const { prodItems, loading } = useProducts();
  const params = useParams();
  const navigate = useNavigate();
  const formattedSubCategoryName = params.name.replace(/-/g, ' ');
  console.log(params.name)
  const matchProducts = prodItems.filter(
    (product) => product.subcategoryId.name === formattedSubCategoryName
  );
  console.log(matchProducts);

  // Array de estados de hover para cada producto
  const [hoveredProducts, setHoveredProducts] = useState(
    Array(matchProducts.length).fill(false)
  );

  // Función para manejar el cambio de estado de hover de un producto específico
  const handleMouseEnter = (index) => {
    const updatedHoveredProducts = [...hoveredProducts];
    updatedHoveredProducts[index] = true;
    setHoveredProducts(updatedHoveredProducts);
  };

  const handleMouseLeave = (index) => {
    const updatedHoveredProducts = [...hoveredProducts];
    updatedHoveredProducts[index] = false;
    setHoveredProducts(updatedHoveredProducts);
  };

  return (
    <>
      <div className="flex justify-center mt-12 md:mt-[-20px] gap-2 items-center align-middle">

        <h3 className="text-center  text-xl md:text-2xl font-bold">
          Productos que podrían{" "}
        </h3>
        <p className="text-[#b3a38e] text-xl md:text-2xl font-bold">interesarte</p>
      </div>
      <Swiper
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation, Autoplay]}
        navigation
        className="mySwiper mt-6 h-[520px] md:h-[490px]"
        breakpoints={{
          300: {
            slidesPerView: 1.3,
            navigation: true,
          },
          400: {
            slidesPerView: 1.5,
          },
          500: {
            slidesPerView: 2,
          },
          550: {
            slidesPerView: 2.3,
          },
          660: {
            slidesPerView: 2.7,
          },
          768: {
            slidesPerView: 2.9,
          },
          820: {
            slidesPerView: 3.4,
          },
          1022: {
            slidesPerView: 3.8,
          },
          1300: {
            slidesPerView: 4,
          },
        }}
      >
        {matchProducts.length < 1 ? (
          <SwiperSlide>
            <p>NO HAY COINCIDENCIAS</p>
          </SwiperSlide>
        ) : (
          matchProducts.map((prod, index) => (
            <SwiperSlide key={prod._id}>
              <div>
                {loading ? (
                  <div className="flex justify-center">
                  <span className="loader"></span>
                  </div>
                ) : (
                  <div
                    key={prod._id}
                    className={`w-[220px] hover:opacity-90  md:w-[250px] lg:w-[300px] cursor-pointer h-auto md:h-[430px] border rounded-[20px] relative overflow-hidden transition-all ease-in-out duration-300 ${hoveredProducts[index] ? "h-auto md:h-[430px]" : ""
                      }`}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                    onClick={() =>
                      navigate(
                        `/products/${prod.subcategoryId.category}/${prod.subcategoryId.name}/${prod.name
                          .replace(/\s+/g, "-")
                          .toLowerCase()}/${prod._id}`
                      )
                    }
                  >
                    <div className="border-b-4 h-[280px] md:h-[270px] relative">
                      <img
                        src={
                          import.meta.env.VITE_ENDPOINT_IMAGES +
                          prod?.images[0].filename
                        }
                        className="h-full object-contain w-full rounded-t-[20px]"
                        alt="product"
                      />
                    </div>
                    <div className="text-center flex  flex-col items-center p-3">
                      <p className="line-clamp-2 w-[190px] text-center">
                        {prod.name}
                      </p>
                      <p className="font-bold text-2xl text-[#ddd6cd]">
                        {prod.price}
                      </p>{" "}
                      <p className="text-sm">
                        <strong>{3}</strong> Cuotas sin interés de{" "}
                        <strong>$3.200,00</strong>
                      </p>
                      <div
                        className={`hidden md:flex gap-4 items-center justify-center opacity-0 ${hoveredProducts[index] ? "opacity-100" : ""
                          } transition-opacity duration-300`}
                      >
                        <button className="bg-[#DDD6CD] hover:bg-[#e5ded5] transition-colors text-white px-4 py-2 rounded-full text-sm w-[100px]">
                          COMPRAR
                        </button>
                        <button className="text-[#9b9b9bf7] border px-4 py-2 rounded-full">
                          <RemoveRedEyeOutlined /> Ver
                        </button>
                      </div>
                      {/* Botones visibles en dispositivos móviles */}
                      <div className="flex justify-center mt-2 gap-6 md:gap-2">
                        <button className="md:hidden bg-[#DDD6CD] text-white px-4 py-2 rounded-full text-sm w-[100px]">
                          COMPRAR
                        </button>
                        <button className="md:hidden text-[#9b9b9bf7] border px-4 py-2 rounded-full">
                          <RemoveRedEyeOutlined />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </>
  );
};

export default ProductsMatch;
