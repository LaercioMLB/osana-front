import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Divider, MenuItem, TextField } from "@mui/material";
import { H1 } from "../../Text";
import { maskCpfCnpj } from "../../../utils/mascaras";
import { useContext } from "react";
import FilterContext from "../../../context/FilterContext";

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

export default function ModalEdit() {
  const [open, setOpen] = React.useState(false);
  const [filterData] = useContext(FilterContext);
  const [cpfCnpj, setCpfCnpj] = React.useState("");
  const [client, setClient] = React.useState("Uniamérica");
  const [prior, setPrior] = React.useState("Urgente");
  const [typeService, setTypeServices] = React.useState("Urgente");

  const handleChangeClient = (event) => {
    setClient(event.target.value);
  };

  const handleChangePrio = (event) => {
    setPrior(event.target.value);
  };

  const handleChangeTypeServices = (event) => {
    setTypeServices(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [currency, setCurrency] = React.useState(false);

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <Box>
      <Box onClick={handleOpen}>Editar</Box>

      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          maxWidth: "600px",
          margin: "auto",
        }}
      >
        {filterData.tabSelected === 0 ? (
          <Box
            sx={{
              ...style,
            }}
          >
            <H1>Cliente</H1>
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
                sx={{ width: "48%" }}
                label="Primeiro Nome"
                variant="outlined"
              />
              <TextField
                sx={{ width: "48%" }}
                label="Sobrenome"
                variant="outlined"
              />
            </Box>
            <Divider sx={{ marginY: "25px" }} />
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
                sx={{ width: "48%" }}
                label="Email"
                required
                variant="outlined"
              />
              <TextField
                sx={{ width: "48%" }}
                label="Celular"
                required
                variant="outlined"
              />
            </Box>
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
                sx={{ width: "48%" }}
                label="Contrato"
                value={currency}
                onChange={handleChange}
              >
                <MenuItem key={0} value={false}>
                  Não
                </MenuItem>
                <MenuItem key={1} value={true}>
                  Sim
                </MenuItem>
              </TextField>
              <TextField
                sx={{ width: "48%" }}
                label="CNPJ/CPF"
                variant="outlined"
                value={cpfCnpj}
                inputProps={{ maxLength: 18 }}
                onChange={(e) => setCpfCnpj(maskCpfCnpj(e.target.value))}
              />
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
        ) : (
          <Box
            sx={{
              ...style,
            }}
          >
            <H1>Editar OS</H1>

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
              rows={3}
              variant="outlined"
              sx={{ marginY: "10px" }}
            />
            <TextField
              fullWidth
              label="Observações"
              multiline
              rows={3}
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
        )}
      </Modal>
    </Box>
  );
}
