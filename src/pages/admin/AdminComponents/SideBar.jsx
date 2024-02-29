import { useState } from "react";
import { AccountCircle, CalendarToday, Dashboard } from '@mui/icons-material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import StarsIcon from '@mui/icons-material/Stars';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import QuizIcon from '@mui/icons-material/Quiz';
import AddCommentIcon from '@mui/icons-material/AddComment';
import logo from "../../../assets/img/logo-blanco.png";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";

const SideBar = () => {
    const [open, setOpen] = useState(false);
    const Menus = [
        { title: "Productos", icon: <Dashboard />, path: `/adminPortaflex/logeado/estadoDelIncioSucces=a878373734674674238283283723467426712` },
        { title: "Ordenes", icon: <AccountCircle />, path: `/adminPortaflex/logeado/estadoDelIncioSucces=a878373734674674238283283723467426712/ordenes` },
        { title: "Productos destacados", icon: <StarsIcon />, path: `/adminPortaflex/logeado/estadoDelIncioSucces=a878373734674674238283283723467426712/destacados` },
        { title: "Cargar un producto", icon: <CalendarToday />, path: `/adminPortaflex/logeado/estadoDelIncioSucces=a878373734674674238283283723467426712/upload` },
        { title: "Cupones", icon: <AutoStoriesIcon />, path: `/adminPortaflex/logeado/estadoDelIncioSucces=a878373734674674238283283723467426712/coupons` },
        { title: "Cargar nuevo cupon", icon: <LibraryAddIcon />, path: `/adminPortaflex/logeado/estadoDelIncioSucces=a878373734674674238283283723467426712/newcupon` },
        { title: "Codigos Postales", icon: <LocalShippingIcon />, path: `/adminPortaflex/logeado/estadoDelIncioSucces=a878373734674674238283283723467426712/cp` },
        { title: "Agregar nuevo codigo postal", icon: <AddLocationIcon />, path: `/adminPortaflex/logeado/estadoDelIncioSucces=a878373734674674238283283723467426712/newcp` },
        { title: "Preguntas frecuentes", icon: <QuizIcon />, path: `/adminPortaflex/logeado/estadoDelIncioSucces=a878373734674674238283283723467426712/preguntas` },
        { title: "Agregar nueva pregunta frecuente", icon: <AddCommentIcon />, path: `/adminPortaflex/logeado/estadoDelIncioSucces=a878373734674674238283283723467426712/newpregunta` },
    ];

    return (
        <div className="flex relative h-[100vh]">
            <div
                className={` ${open ? "w-72" : "w-20 "
                    } bg-[#c7b297]  p-5  h-full pt-8 relative duration-300`}
            >
                <ArrowBackIcon className={`absolute cursor-pointer -right-3 top-9 w-7 bg-[#ffd6a0] text-[#000000]
           border-2 rounded-full  ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)} />

                <div className="flex gap-x-4 items-center">
                    <img
                        src={logo}
                        className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
                            }`}
                    />

                </div>
                <ul className="pt-6">
                    {Menus.map((Menu, index) => (
                        <Tooltip placement="right" title={Menu.title}>
                            <Link
                                to={Menu.path}
                                key={index}
                                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-white text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-2" : "mt-2"} ${index === 0 && "bg-light-white"
                                    } `}
                            >
                                {Menu.icon}
                                <Link to={Menu.path} className={`${!open && "hidden"} origin-left duration-200`}>
                                    {Menu.title}
                                </Link>
                            </Link>
                        </Tooltip>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SideBar;
