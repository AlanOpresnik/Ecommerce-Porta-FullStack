import React, { useEffect } from "react";
import { useProducts } from "../../../context/ProductsContext";
import ProductCompraCard from "./ProductsCompraCard";
import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "react-router-dom";

const ProductsCompraSection = () => {
  const { prodItems } = useProducts();
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
      {filteredByCategoryProducts.length === 0 && (
        <div className="text-center w-full flex justify-center">
          <h3 className="text-xl md:text-2xl border-b py-4 text-center">
            No hay productos de {params.subcategory} actualmente 😔
          </h3>
        </div>
      )}
      <div className="grid grid-cols-2 mt-6 md:mt-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 justify-center items-center">
        <AnimatePresence>
          {filteredByCategoryProducts?.map((item) => (
            <motion.div
              initial={{ opacity: 0, }}
              animate={{ opacity: 1, }}
              transition={{ duration: 0.5 }}
              key={item._id}
              className="w-full h-[490px] md:h-[490px]"
            >
              <ProductCompraCard prod={item} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ProductsCompraSection;
