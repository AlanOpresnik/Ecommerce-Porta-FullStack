import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext";

const AsideCategoryDesktop = () => {
  const { categorys } = useProducts()
  const location = useLocation();
  const currentPath = location.pathname;
  const params = useParams()
  console.log(params)

  const filteredCategories = categorys?.filter(category => (
    category.category === params.category &&
    category.subcategoryId?.category !== "Construcción"
  )) || [];

  return (
    <div className="hidden md:block sticky top-[222px]">
      <div className="w-[226px]">
        <h4>
          Categoria / <span className="font-bold">{params.category}</span>
        </h4>
      </div>
      <div className="flex flex-col mt-4 gap-2 max-w-[200px] border-b pb-2">
        <Link
          key={"todas"}
          className={`${currentPath === `/products/${params.category}` ? "text-[#b7b0a8] font-bold" : ""
            } hover:text-[#b7b0a8] transition-transform`}
          to={`/products/${params.category}`}
        >
          Todas
        </Link>
        {filteredCategories?.map(category => (
          <Link
            key={category.name}
            className={`${currentPath === `/products/${params.category}/${category.name.replace(/\s+/g, '-')}` ? "text-[#b7b0a8] font-bold" : ""
              } hover:text-[#b7b0a8] transition-transform`}
            to={`/products/${category.category}/${category.name.replace(/\s+/g, '-')}`}
          >
            {category.name}
          </Link>
        ))}

      </div>
      <div className="flex flex-col gap-2 ">
        <div className="max-w-[200px]">
          <p className="mt-7 text-[16px]">Filtrar por precio</p>
        </div>
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            placeholder="desde"
            className="border max-w-[90px] rounded-full bg-[#F4F4F5] p-2"
          />
          <input
            type="text"
            placeholder="hasta"
            className="border max-w-[90px] bg-[#F4F4F5] rounded-full p-2"
          />
        </div>
      </div>
    </div>
  );
};

export default AsideCategoryDesktop;
