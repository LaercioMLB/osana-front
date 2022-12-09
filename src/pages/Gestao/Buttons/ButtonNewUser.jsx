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
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

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
  const [listAuthority, setListAuthority] = React.useState([]);
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleOpen = () => {
    setOpen(true);
    setName("");
    setUsername("");
    setAuthority("");
    setEmail("");
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
    const { password } = values
    if (name && username && authority && email && password){
      await api.post('/users', {
            name: name,
            username: username, 
            email: email, 
            password: password, 
            typeUser: authority === "GESTOR" ? "ROLE_GESTOR" : "ROLE_TECNICO",
        }, 
        config
      )
      .then(() => {
        toast.success("Usuário Cadastrado com Sucesso")
        createNewUser()
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
            <FormControl sx={{ width: "48%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
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
