import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { H1 } from "../../../../components/Text";
import api from "../../../../services/api";
import { toast } from 'react-toastify';
import { MenuItem } from "@mui/material";

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
  width: "70%",
};

export default function DeleteUser({ idUser, nameUser, deleteUser, handleCloseMenu }) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    handleCloseMenu();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const config = {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": "application/json", 
    },
  };

  const handleDeleteUser= async (event) => {
    event.preventDefault();
    await api.delete(`/users/${idUser}`, config)
    .then(() => {
      toast.success("Usuário Deletado com Sucesso")
      deleteUser()
      handleClose();
    })
    .catch((error) => toast.error(error.response.data)
    );
  };

  return (
    <div>
      <MenuItem onClick={handleOpen}>Excluir</MenuItem>

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
          <H1>Tem certeza que deseja deletar o Usuário: {nameUser.toUpperCase()} ?</H1>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginY: "10px",
            }}
          >
            <Button
              onClick={handleDeleteUser}
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
    </div>
  );
}

