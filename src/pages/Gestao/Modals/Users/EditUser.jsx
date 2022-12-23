import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import api from "../../../../services/api";
import { rolesUsers } from "../../../../services/staticData";
import { toast } from 'react-toastify';
import { H1 } from "../../../../components/Text";
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

export default function EditUser({ user, editUser, handleCloseMenu }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [authority, setAuthority] = React.useState(0);
  const [listAuthority, setListAuthority] = React.useState([]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    handleCloseMenu();
  };

  function setValues(){
    setName(user.name);
    setUsername(user.username);
    setAuthority(user.roles[0].authority === 'ROLE_GESTOR' ? "GESTOR" : "TÉCNICO");
    setEmail(user.email);
    setListAuthority(rolesUsers)
  }

  const handleChangeAuthority = (event) => {
    setAuthority(event.target.value);
  };

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

  const handleEditUser = async (event) => {
    event.preventDefault();
    if (name && username && authority && email){
      await api.put(`/users/${user.id}`, {
          name: name,
          email: email, 
          username: username, 
          typeUser: authority === "GESTOR" ? "ROLE_GESTOR" : "ROLE_TECNICO",
        }, 
        config
      )
      .then((response) => {
        toast.success("Usuário Editado com Sucesso")
        editUser(response.data)
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
              label="Name"
              value={name}
              variant="outlined"
              onChange={event => setName(event.target.value)}
            />
            <TextField
              sx={{ width: "48%" }}
              label="Username"
              value={username}
              variant="outlined"
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
              select
              label="Autorização"
              value={authority}
              onChange={handleChangeAuthority}
              sx={{ marginBottom: "10px", width: "48%" }}
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
            <Button sx={{ marginRight: "10px" }} variant="contained" onClick={handleEditUser}>
              Confirmar
            </Button>
            <Button variant="outlined" onClick={handleClose}>Cancelar</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

