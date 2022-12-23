import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { H1 } from "../../Text";
import DeleteIcon from "@mui/icons-material/Delete";

const style = {
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "none",
  padding: "20px",
  borderRadius: "6px",
  width: "300px",
};

export default function ModalDelete({ enableIcon }) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Box>
      {enableIcon === true ? (
        <DeleteIcon sx={{ cursor: "pointer" }} onClick={handleOpen} />
      ) : (
        <Box onClick={handleOpen}>Excluir</Box>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          maxWidth: "900px",
          margin: "auto",
        }}
      >
        <Box
          sx={{
            ...style,
          }}
        >
          <H1>Tem certeza que deseja deletar?</H1>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginY: "10px",
            }}
          >
            <Button
              onClick={handleClose}
              sx={{ marginRight: "10px" }}
              variant="contained"
            >
              Deletar
            </Button>
            <Button onClick={handleClose} variant="outlined">
              Cancelar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
