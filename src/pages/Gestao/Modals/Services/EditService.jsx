import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import api from "../../../../services/api";
import { toast } from 'react-toastify';
import { H1 } from "../../../../components/Text";
import { MenuItem, TextField } from "@mui/material";

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
  width: "100%",
};

export default function EditService({ service, editService, handleCloseMenu }) {
  const [open, setOpen] = React.useState(false);
  const [services, setServices] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    handleCloseMenu();
  };

  function setValues(){
    setServices(service.services);
  }

  React.useEffect(() => {
    if (open === true){
      setValues();
    }
  }, [open])

  const config = {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": "application/json", 
    },
  };

  const handleEditService = async (event) => {
    event.preventDefault();
    if (services){
      await api.put(`/services/${service.idTypeServices}`, {
          services: services,
        }, 
        config
      )
      .then((response) => {
        toast.success("Serviço Editado com Sucesso")
        editService(response.data)
        handleClose();
      })
      .catch((error) => toast.error(error.response.data)
      );
    }else{
      toast.error("Preencha o Formulário corretamente !")
    }
  };

  return (
    <div>
      <MenuItem onClick={handleOpen}>Editar</MenuItem>

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
          <H1>Serviço</H1>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <TextField
              sx={{ width: "100%" }}
              label="Name"
              value={services}
              required
              variant="outlined"
              onChange={event => setServices(event.target.value)}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              marginY: "10px",
              marginTop: "30px"
            }}
          >
            <Button sx={{ marginRight: "10px" }} variant="contained" onClick={handleEditService}>
              Confirmar
            </Button>
            <Button variant="outlined" onClick={handleClose}>Cancelar</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

