import React, { useEffect, useState } from "react";
import NavbarItem from "./NavbarItem";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
import { PiShoppingCartThin } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import Search from "./search/Search";
import SecondNavbar from "./SecondNavbar";
import { useProducts } from "../../context/ProductsContext";
import {
  FavoriteBorderOutlined,
  FavoriteBorderTwoTone,
  FavoriteOutlined,
} from "@mui/icons-material";
const NavbarItems = [
  {
    path: "/",
    title: "Inicio",
  },
  {
    path: "/products/hogar",
    title: "Hogar",
  },
  {
    path: "/products/construccion",
    title: "Construccion",
  },
];

const NavbarItemsMobile = [
  {
    path: "/",
    title: "Inicio",
  },
  {
    path: "/products/hogar",
    title: "Hogar",
  },
  {
    path: "/products/construccion",
    title: "Construccion",
  },
  {
    path: "/nosotros",
    title: "Nuestra historia",
  },
  {
    path: "/devoluciones",
    title: "Cambios y devoluciones",
  },
];

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { prodItems, cartItems } = useProducts();
  const closeMenu = () => {
    setOpenMenu(false);
  };
  const [filteredProducts, setFilteredProducts] = useState(prodItems);

  const handleSearch = (searchTerm) => {
    const filtered = prodItems.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="h-[90px] ">
        <nav className="bg-white  dark:bg-[#fff] fixed w-full z-20  start-0 border-b border-gray-200 ">
          <div className="w-full h-[30px]  bg-[#DDD6CD] z-50 "></div>
          <div className="max-w-[1380px] flex items-center justify-between  mx-auto p-4">
            <Link
              to="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <h2 className="text-[24px] mr-4 md:text-[28px] text-[#9C9C9C] newsLetter-heading font-bold">
                PortaFlex
              </h2>
            </Link>
            <div className="flex md:order-1 space-x-0 md:space-x-0 rtl:space-x-reverse">
              <Search products={filteredProducts} onSearch={handleSearch} />
              <div className=" flex relative md:hidden px-2 items-center">
                <PiShoppingCartThin
                  onClick={() => navigate("/cart")}
                  className="cursor-pointer text-[#cacaca] text-4xl font-bold"
                  sx={{ color: "#D9D9D9" }}
                />
                   {cartItems.length >= 1 ? (
                    <span
                      onClick={() => navigate("/cart")}
                      className="absolute cursor-pointer text-xs font-bold text-white w-[23px] h-[24px] items-center text-center border p-1 rounded-full bg-[#aea18f] right-[-15px] top-[-10px]"
                    >
                      {cartItems.length}
                    </span>
                  ) : (
                    ""
                  )}
              </div>
                <Button onClick={() => setOpenMenu(!openMenu)}>
                  <MenuIcon
                    sx={{ color: "#AAAAAA", width: "32px", height: "32px" }}
                  />
                </Button>
            </div>

            <div
              className="items-center  justify-between hidden w-full md:flex md:w-auto md:order-1 "
              id="navbar-sticky"
            >
              <ul className="flex items-center  flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-[#fff] md:dark:bg-[#fff] ">
                {NavbarItems.map((item) => (
                  <NavbarItem key={item.path} item={item} />
                ))}
                <div className="flex flex-col relative items-center">
                  <PiShoppingCartThin
                    onClick={() => navigate("/cart")}
                    className="cursor-pointer text-[#cacaca] text-4xl font-bold"
                    sx={{ color: "#D9D9D9" }}
                  />
                  {cartItems.length >= 1 ? (
                    <span
                      onClick={() => navigate("/cart")}
                      className="absolute cursor-pointer text-xs font-bold text-white w-[23px] h-[24px] items-center text-center border p-1 rounded-full bg-[#aea18f] right-[-5px] top-[-10px]"
                    >
                      {cartItems.length}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </ul>
            </div>
          </div>
          <SecondNavbar />
        </nav>
        {/*mobile navbar */}

        <div
          className={` shadow-md bg-[#ffff] w-[260px] rounded-lg fixed  z-50 top-[109px] p-6 ${
            openMenu ? "left-0" : "left-[-300px]"
          } transition-all ease-in-out duration-300`}
        >
          {/* Agrega un manejador de clic para cerrar el menú */}
          <div className="" onClick={closeMenu}>
            <ul className="flex flex-col font-medium  text-[#AAAAAA] ">
              {NavbarItemsMobile.map((item) => (
                <NavbarItem key={item.path} item={item} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
