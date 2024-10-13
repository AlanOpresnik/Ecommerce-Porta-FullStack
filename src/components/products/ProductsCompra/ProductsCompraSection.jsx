import React, { useEffect } from "react";
import { useProducts } from "../../../context/ProductsContext";
import ProductCompraCard from "./ProductsCompraCard";
import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "react-router-dom";
import '../../../index.css'

const ProductsCompraSection = () => {
  const { prodItems, loading, setLoading } = useProducts();
  const params = useParams();

  // Convertir guiones a espacios en la subcategoría de los parámetros de la URL
  const subcategoryWithSpaces = params.subcategory?.replace(/-/g, ' ');

  const filteredByCategoryProducts = prodItems.filter(product => {
    // Verificar si hay una subcategoría en los parámetros de la URL
    if (subcategoryWithSpaces) {
      // Filtrar los productos que tengan la subcategoría especificada en la URL
      return product.subcategoryId.name === subcategoryWithSpaces;
    } else {
      // Si no hay subcategoría en los parámetros de la URL, filtrar por categoría solamente
      return product.subcategoryId.category === params.category;
    }
  });

  return (
    <>
      {loading ? (
        <div className="flex justify-center">
          <span className="loader"></span>
        </div>
      ) : (
        filteredByCategoryProducts.length === 0 ? (
          setLoading(false),
          <div className="flex justify-center items-start w-full">
            <div className="text-center w-full flex items-center justify-center">
              <h3 className="text-xl md:text-2xl border-b py-4 text-center">
                No hay productos de {params.subcategory} actualmente 😔
              </h3>
            </div>
          </div>
        ) : (
          <div className="grid-custom mt-6 md:mt-0  justify-center items-center ">
            <AnimatePresence>
              {filteredByCategoryProducts?.map((item) => (
                <motion.div
                  initial={{ opacity: 0, }}
                  animate={{ opacity: 1, }}
                  transition={{ duration: 0.5 }}
                  key={item._id}
                  className=" h-[490px] "
                >
                  <ProductCompraCard prod={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )
      )}


    </>
  );
};

export default ProductsCompraSection;
