import React, { useEffect, useState } from "react";
import formatPrice from "../../../../helpers/formatPrice";
import DescriptionPublication from "./ProductDescription";
import { useProducts } from "../../../../context/ProductsContext";
import toast from "react-hot-toast";

const ProductDetailAside = ({ product, imageRef }) => {
    const { addToCart, isInCart, getColors, colors } = useProducts();
    const [color, setSelectedColor] = useState(null);
    // Función para detectar si es móvil
    const isMobile = () =>
        window.matchMedia("(max-width: 640px)").matches;


    const handleAddToCart = () => {
        // Si el producto ya está en el carrito, no ejecuta la animación
        if (isInCart(product._id)) {
            toast.error(`El producto ya se encuentra en el carrito`);
            return;

            
        }

        if (!color) {
            toast.error("Por favor, selecciona un color");
            return;
          }

        if (!imageRef.current) return;

        const cartIcon = isMobile()
            ? document.querySelector("#cart-icon2")
            : document.querySelector("#cart-icon");

        const img = imageRef.current;
        const clonedImg = img.cloneNode(true);

        const { top, left, width, height } = img.getBoundingClientRect();
        clonedImg.style.position = "fixed";
        clonedImg.style.top = `${top}px`;
        clonedImg.style.left = `${left}px`;
        clonedImg.style.width = `${width}px`;
        clonedImg.style.height = `${height}px`;
        clonedImg.style.transition = "all 0.8s ease-in-out";
        clonedImg.style.zIndex = 1000;

        document.body.appendChild(clonedImg);

        const { top: cartTop, left: cartLeft } = cartIcon.getBoundingClientRect();
        requestAnimationFrame(() => {
            clonedImg.style.top = `${cartTop}px`;
            clonedImg.style.left = `${cartLeft}px`;
            clonedImg.style.width = "40px";
            clonedImg.style.height = "40px";
            clonedImg.style.opacity = 0;
        });

        clonedImg.addEventListener("transitionend", () => {
            clonedImg.remove();
        });
        const productWithColor = { ...product, color };

        addToCart(productWithColor); 
      };
   

    useEffect(() => {
        getColors()
    }, [])
    const handleSelectColor = (color) => {
        setSelectedColor(color); // Guardamos el color seleccionado
      };

    return (
        <div className="relative w-full lg:pl-10 lg:py-6 mt-6 md:mt-0 lg:mt-0">
            {product.featured ? (
                <p className='text-xs absolute right-0 top-[-10px] md:top-[-14px] lg:top-0 bg-[#d3a360] py-1.5 lg:py-2 px-2 rounded-full font-semibold text-white'>Producto destacado</p>
            ) : ""}
            <h2 className="text-sm title-font mb-1 text-gray-500 tracking-widest">
                {product.subcategoryId.category}
            </h2>

            <h1 className="text-gray-900 text-3xl  title-font font-medium mb-1">
                {product.name}
            </h1>
            <p>{colors.length === 0 ? "cargando colores..." : (
                <div className="flex flex-wrap gap-2">
                    {colors.map((colorProds) => (
                        <button
                            key={colorProds._id}
                            onClick={() => handleSelectColor(colorProds)} // Maneja la selección
                            className={`px-2 py-1 rounded-full w-[30px] h-[30px] border-2 
                            ${color?.hex === colorProds.hex ? "border-black" : "border-transparent"}`}
                            style={{ backgroundColor: colorProds.hex }}
                        />
                    ))}
                </div>
            )}</p>
            
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
            <DescriptionPublication description={product.description} />
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5"></div>
            <div className="flex gap-5 items-center">
                <p className=" font-semibold text-2xl text-gray-900">
                    {formatPrice(product.price)}
                </p>
                {product.stock ? (
                    <button
                        onClick={handleAddToCart}
                        className="flex ml-auto text-white bg-[#dbcdbc] border-0 py-2 px-6 focus:outline-none hover:bg-[#cbc2b6] rounded"
                    >
                        Agregar al carrito
                    </button>
                ) : (
                    <button
                        className="flex ml-auto  text-sm text-white font-semibold  border-0 py-2 px-6 focus:outline-none bg-[#cbc2b6] rounded"
                    >
                        No hay stock actualmente
                    </button>
                )}

            </div>
        </div>
    )
}

export default ProductDetailAside;
