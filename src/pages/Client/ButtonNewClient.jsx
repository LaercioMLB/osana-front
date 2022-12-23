import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { H1 } from "../../components/Text";
import { Divider, MenuItem, TextField } from "@mui/material";
import { maskCpfCnpj } from "../../utils/mascaras";
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
  width: "100%",
};

export default function ButtonNewClient({ createNewClient }) {
  const [open, setOpen] = React.useState(false);
  const [cpfCnpj, setCpfCnpj] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
    setCpfCnpj("")
    setFirstName("")
    setLastName("")
    setEmail("")
    setPhone("")
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [currency, setCurrency] = React.useState(false);

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const config = {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": "application/json", 
    },
  };

  const handleCreateClient = async (event) => {
    event.preventDefault();
    if (cpfCnpj && firstName && lastName && email && phone){
      await api.post('/client', {
            firstName: firstName,
            lastName: lastName, 
            email: email, 
            phone: phone.replace(/[^0-9]/g,''), 
            contract: currency,
            cnpj: cpfCnpj.replace(/[^0-9]/g,''),
        }, 
        config
      )
      .then(() => {
        toast.success("Cliente Cadastrado com Sucesso")
        createNewClient()
        setOpen(false);
      })
      .catch((error) => toast.error(error.response.data)
      );
    }else{
      toast.error("Preencha o Formulário corretamente !")
    }
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{ height: "100%" }}
        variant="contained"
        startIcon={<AddIcon />}
      >
        Adicionar Cliente
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
              onChange={event => setFirstName(event.target.value)}
            />
            <TextField
              sx={{ width: "48%" }}
              label="Sobrenome"
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
              required
              variant="outlined"
              onChange={event => setEmail(event.target.value)}
            />
            <TextField
              sx={{ width: "48%" }}
              label="Celular"
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
              marginTop: "30px"
            }}
          >
            <Button sx={{ marginRight: "10px" }} variant="contained" onClick={handleCreateClient}>
              Confirmar
            </Button>
            <Button variant="outlined" onClick={handleClose}>Cancelar</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
