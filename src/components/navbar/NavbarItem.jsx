import React from "react";
import { Link } from "react-router-dom";

const NavbarItem = ({ item }) => {
  return (
    <li>
      <Link
        to={item.path}
        className="block font-semibold  py-2 px-3 rounded md:p-0 text-[#808080] hover:text-[#DDD6CD] transition-colors duration-75"
        aria-current="page"
      >
        {item.title}
      </Link>
    </li>
  );
};

export default NavbarItem;
