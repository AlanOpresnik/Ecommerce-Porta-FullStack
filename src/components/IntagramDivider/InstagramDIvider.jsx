import { Instagram } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const InstagramDIvider = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col justify-center items-center text-center">
      <div className="flex items-center text-centers gap-2">
        <Instagram sx={{ color: "#9C9C9C", fontSize: "32px" }} />
        <h2 className="text-[32px] text-[#9C9C9C] newsLetter-heading font-bold">
        portaflexargentina
        </h2>
      </div>
      <div className="flex flex-col items-center gap-3">
        <p className="text-[#9C9C9C] newsLetter-heading ">
          Estamos en instagram
        </p>
        <a
        className="py-2"
        target="_BLANK"
        href="https://www.instagram.com/portaflexargentina/?igsh=MWJidDYxOTRrdG1zcg%3D%3D"
          style={{
            color: "#9C9C9C",
            borderRadius: "20px",
            width: "120px",
            border: "1px solid #9C9C9C",
            "&:hover": {
              backgroundColor: "transparent",
              borderColor: "#9C9C9C", // Elimina el color de fondo en hover
            },
          }}
          variant="outlined"
        >
          Seguinos
        </a>
      </div>
    </div>
  );
};

export default InstagramDIvider;
