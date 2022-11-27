import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { H1 } from "../../components/Text";
import api from "../../services/api";
import { toast } from 'react-toastify';

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

export default function DeleteClient({ idClient, nameCliente, deleteClient }) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
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

  const handleDeleteClient = async (event) => {
    event.preventDefault();
    await api.delete(`/client/${idClient}`, config)
    .then(() => {
      toast.success("Cliente Deletado com Sucesso")
      deleteClient(idClient)
      setOpen(false);
    })
    .catch((error) => toast.error(error.response.data)
    );
  };

  return (
    <Box>
      <Box onClick={handleOpen}>Excluir</Box>

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
          <H1>Tem certeza que deseja deletar o Cliente {nameCliente} ?</H1>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginY: "10px",
            }}
          >
            <Button
              onClick={handleDeleteClient}
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

