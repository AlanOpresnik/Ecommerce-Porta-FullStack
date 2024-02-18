import React from "react";
import {
  LocalShippingOutlined,
  SportsFootballOutlined,
  WhereToVoteOutlined,
} from "@mui/icons-material";
import FactoryIcon from '@mui/icons-material/Factory';

const cardItems = [
  {
    title: "Somos fabricantes",
    description: "Hace mas de 8 años",
    icon: (
      <FactoryIcon
        sx={{ width: "69px", height: "69px", color: "#6D6D6D" }}
      />
    ),
  },
  {
    title: "Nos ubicamos en",
    description: "Polo 24 - Parque industrial",
    icon: (
      <WhereToVoteOutlined
        sx={{ width: "69px", height: "69px", color: "#6D6D6D" }}
      />
    ),
  },
  {
    title: "Enviamos tu compra",
    description: "en 20 dias habiles",
    icon: (
      <LocalShippingOutlined
        sx={{ width: "69px", height: "69px", color: "#6D6D6D" }}
      />
    ),
  },
];

const InfoDividerCard = () => {
  return (
    <div className="flex gap-6 justify-center md:justify-evenly items-center flex-wrap">
      {cardItems.map((item) => (
        <div className="flex flex-col justify-center md:flex-row gap-2 text-center md:gap-12 items-center mt-12 w-[400px] pb-12 border-b md:border-none md:w-auto md:mt-[72px]" key={item.title}>
          {item.icon}
          <div className="leading-3">
            <p className="font-bold text-lg">{item.title}</p>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoDividerCard;
