import React, { useEffect } from "react";
import { useProducts } from "../../../context/ProductsContext";
import ProductCompraCard from "./ProductsCompraCard";
import { AnimatePresence, motion } from "framer-motion";

const ProductsCompraSection = () => {
  const { prodItems } = useProducts();

  return (
    <div className="grid grid-cols-2 mt-6 md:mt-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 justify-center items-center">
      <AnimatePresence>
        {prodItems?.map((item) => (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            key={item._id}
            className="w-full h-[490px] md:h-[490px]"
          >
            <ProductCompraCard prod={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ProductsCompraSection;
