import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { H1 } from "../../components/Text";
import { Divider, MenuItem, TextField } from "@mui/material";
import { StylesProvider } from "@material-ui/core";

const clientes = [
  {
    value: "Uniamérica",
  },
];

const prioridade = [
  {
    value: "Urgente",
  },
];

const services = [
  {
    value: "Formatação",
  },
];

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

export default function ButtonNewService() {
  const [open, setOpen] = React.useState(false);
  const [client, setClient] = React.useState("Uniamérica");
  const [prior, setPrior] = React.useState("Urgente");
  const [typeService, setTypeServices] = React.useState("Urgente");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeClient = (event) => {
    setClient(event.target.value);
  };

  const handleChangePrio = (event) => {
    setPrior(event.target.value);
  };

  const handleChangeTypeServices = (event) => {
    setTypeServices(event.target.value);
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{ height: "100%" }}
        variant="contained"
        startIcon={<AddIcon />}
      >
        Nova OS
      </Button>

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
          <H1>Nova OS</H1>

          <TextField
            select
            label="Cliente"
            value={client}
            onChange={handleChangeClient}
            sx={{ marginBottom: "10px" }}
          >
            {clientes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Motivo"
            multiline
            rows={6}
            variant="outlined"
            sx={{ marginY: "10px" }}
          />
          <TextField
            fullWidth
            label="Observações"
            multiline
            rows={6}
            variant="outlined"
            sx={{ marginY: "10px" }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              marginY: "10px",
            }}
          >
            <TextField
              select
              label="Prioridade"
              value={prior}
              onChange={handleChangePrio}
              sx={{ marginBottom: "10px", width: "48%" }}
            >
              {prioridade.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Tipo de serviço"
              value={typeService}
              onChange={handleChangeTypeServices}
              sx={{ marginBottom: "10px", width: "48%" }}
            >
              {services.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              marginY: "10px",
            }}
          >
            <Button sx={{ marginRight: "10px" }} variant="contained">
              Confirmar
            </Button>
            <Button variant="outlined">Cancelar</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
