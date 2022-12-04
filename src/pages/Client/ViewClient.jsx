import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { H1 } from "../../components/Text";
import { maskCpfCnpj } from "../../utils/mascaras";
import { Divider, MenuItem, TextField } from "@mui/material";

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

export default function ViewClient({ client, handleCloseMenu }) {
  const [open, setOpen] = React.useState(false);
  const [cpfCnpj, setCpfCnpj] = React.useState(client.cnpj === null ? "Não tem Identidade" : client.cnpj);
  const [firstName, setFirstName] = React.useState(client.firstName === null ? "Não tem Nome" : client.firstName);
  const [lastName, setLastName] = React.useState(client.lastName === null ? "Não tem Sobrenome" : client.lastName);
  const [email, setEmail] = React.useState(client.email === null ? "Não tem E-mail" : client.email);
  const [phone, setPhone] = React.useState(client.phone === null ? "Não tem Telefone" : client.phone);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    handleCloseMenu();
  };

  const [currency, setCurrency] = React.useState(client.contract);

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <div>
      <MenuItem onClick={handleOpen}>Visualizar Dados</MenuItem>

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
              value={firstName}
              disabled
              variant="outlined"
              onChange={event => setFirstName(event.target.value)}
            />
            <TextField
              sx={{ width: "48%" }}
              label="Sobrenome"
              value={lastName}
              disabled
              variant="outlined"
              onChange={event => setLastName(event.target.value)}
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
              value={email}
              disabled
              required
              variant="outlined"
              onChange={event => setEmail(event.target.value)}
            />
            <TextField
              sx={{ width: "48%" }}
              label="Celular"
              value={phone}
              disabled
              required
              variant="outlined"
              onChange={event => setPhone(event.target.value)}
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
              disabled
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
              disabled
              inputProps={{ maxLength: 18 }}
              onChange={(e) => setCpfCnpj(maskCpfCnpj(e.target.value))}
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
            <Button variant="outlined" onClick={handleClose}>Fechar Modal</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

