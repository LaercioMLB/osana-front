import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { H1 } from "../../../components/Text";
import api from "../../../services/api";
import { Divider, MenuItem, TextField } from "@mui/material";
import { toast } from 'react-toastify';
import { rolesUsers } from "../../../services/staticData";

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

export default function ButtonNewUser({ createNewUser }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [authority, setAuthority] = React.useState(0);
  const [password, setPassword] = React.useState("");
  const [listAuthority, setListAuthority] = React.useState([]);

  const handleOpen = () => {
    setOpen(true);
    setName("");
    setUsername("");
    setAuthority("");
    setEmail("");
    setPassword("");
    setListAuthority(rolesUsers)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeAuthority = (event) => {
    setAuthority(event.target.value);
  };

  const config = {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": "application/json", 
    },
  };

  const handleCreateUser = async (event) => {
    event.preventDefault();
    if (name && username && authority && email){
      await api.post('/users', {
            name: name,
            username: username, 
            email: email, 
            password: password, 
            typeUser: authority === "GESTOR" ? "ROLE_GESTOR" : "ROLE_TECNICO",
        }, 
        config
      )
      .then((response) => {
        toast.success("Usuário Cadastrado com Sucesso")
        createNewUser(response.data)
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
        Adicionar Usuário
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
          <H1>Usuário</H1>
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
              label="Nome"
              value={name}
              variant="outlined"
              required
              onChange={event => setName(event.target.value)}
            />
            <TextField
              sx={{ width: "48%" }}
              label="Username"
              value={username}
              variant="outlined"
              required
              onChange={event => setUsername(event.target.value)}
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
              marginBottom: "20px",
            }}
          >
            <TextField
              sx={{ width: "48%" }}
              label="Email"
              value={email}
              required
              variant="outlined"
              onChange={event => setEmail(event.target.value)}
            />
            <TextField
              sx={{ width: "48%" }}
              label="Senha"
              value={password}
              required
              variant="outlined"
              onChange={event => setPassword(event.target.value)}
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
              label="Autorização"
              required
              value={authority}
              onChange={handleChangeAuthority}
              sx={{ marginBottom: "10px", width: "100%" }}
            >
              {listAuthority.map((option) => (
                <MenuItem
                  key={option.id}
                  value={option.name}
                >
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              marginY: "10px",
              marginTop: "30px"
            }}
          >
            <Button sx={{ marginRight: "10px" }} variant="contained" onClick={handleCreateUser}>
              Confirmar
            </Button>
            <Button variant="outlined" onClick={handleClose}>Cancelar</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
