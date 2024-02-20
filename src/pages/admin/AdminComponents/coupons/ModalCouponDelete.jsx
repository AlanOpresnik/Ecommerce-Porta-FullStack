import { Modal, Button, Paper, Typography } from "@mui/material";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
const ModalCouponDelete = ({ open, onClose, onConfirm, cuponTitle }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-delete-modal"
      aria-describedby="confirm-delete-modal-description"
    >
      <Paper
        sx={{
          position: "absolute",
          borderRadius: ".7rem",
          width: 400, // Estilo predeterminado para pantallas más grandes
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          "@media (max-width: 768px)": {
            width: 350, // Estilo para pantallas de 768px o menos
          },
        }}
      >
        <Typography
          variant="h6"
          id="confirm-delete-modal"
          className="border-b-2 text-[#BF3737]"
        >
         <ReportProblemIcon/> ¿Estas seguro?
        </Typography>
        <div>

          <Typography
            id="confirm-delete-modal-description"
            sx={{ marginTop: ".6rem" }}
            className="flex flex-wrap"
          >
            ¿Deseas eliminar el cupon:{" "}
            <p className="text-[#b29f87] text-md font-bold">{cuponTitle}</p>?
          </Typography>
        </div>

        <Button
          aria-label="eliminar de carrito"
          sx={{
            bgcolor: "#cbc2b6",
            color: "white",
            marginTop: "1rem",
            "&:hover": {
              bgcolor: "#b29f87",
            },
          }}
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          Confirmar
        </Button>
        <Button
          aria-label="cancelar"
          sx={{ color: "black", marginTop: "1rem", marginLeft: ".5rem" }}
          className="bg-transparent border hover:text-[#7a7267]"
          onClick={onClose}
        >
          Cancelar
        </Button>
      </Paper>
    </Modal>
  );
};

export default ModalCouponDelete;