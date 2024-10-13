import React, { useState } from "react";
import { Link } from "react-router-dom";
import formatProductName from "../../../helpers/formatProductName";

const Search = ({ products, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };

  const cleanSearch = () => {
    setSearchTerm("")
  }
  return (
    //EL SEARCH SE HARA DESDE EL BACKEND ACTUALMENTE ES UNA FORMA BASICA DE MOSTRAR LOS PRODUCTOS
    <div className="flex flex-col relative">
      <div className="relative w-[130px] md:w-[260px] lg:w-[460px]">
        <div className="absolute inset-y-0 start-0 flex items-center  ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-[130px] md:w-[260px] lg:w-[400px] xl:w-[600px]   p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg  dark:bg-[#ffff] "
          placeholder="Search"
          style={{ outline: "none" }}
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="absolute top-[50px] w-[320px] right-[-50px] md:left-0  md:w-[400px] lg:w-[500px] xl:w-[600px] z-50 bg-white  shadow-xl">
        {searchTerm !== "" && (
          <div className="max-h-[250px] md:max-h-[400px] border overflow-y-scroll">
            {products.map((product) => (
              <Link
                to={`/products/${product.subcategoryId.category}/${product.subcategoryId.name}/${formatProductName(product.name)}/${product._id}`}
                className="flex items-center hover:bg-[#59595920] cursor-pointer px-2 py-2 border-b"
                key={product._id}
                onClick={cleanSearch}
              >
                <div className="max-w-[150px] md:max-w-[200px]">
                  {product.images && product.images.length == 0 ? (
                    <img
                      className="max-h-[120px] w-[180px]"
                      src="/no-image.jpg"
                      alt={product.name}
                    />
                  ) : (
                    <img
                      className="max-h-[120px] w-[180px]"
                      src={
                        product.images[0].secure_url
                      }
                      alt={product.name}
                    />
                  )}
                </div>
                <div className="px-2">
                  <h3 className="text-sm">{product.name}</h3>
                  <p className="text-md font-bold text-[#DDD6CD]">
                    ${product.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
