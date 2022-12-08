import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { ToastContainer, toast } from 'react-toastify';

import api from "../../services/api";

function Login() {
  const [userData, setUserData] = useContext(UserContext);

  const [values, setValues] = useState({
    amount: "",
    username: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    const { username, password } = values

    await api.post('/auth', {username, password})
      .then(response => {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('username', response.data.user.username)
        setUserData({
          isGestor: response.data.user.roles[0].authority === 'ROLE_GESTOR',
          user: response.data.user
        })
        navigate("/")
        toast.success(`Logado com Sucesso, Bem Vindo ${response.data.user.name}`);
      })
      .catch(error => {
        toast.error(error.response.data);
      })
  }

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

  useEffect(() => {
    if (localStorage.getItem('token')){
      navigate("/")
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <ToastContainer />
      <Box
        sx={{
          marginX: "auto",
          height: "550px",
          maxWidth: "575px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "100px",
          borderRadius: "5px",
          boxShadow: "0px 4px 100px rgba(0, 0, 0, 0.25)",
          padding: "20px",
          // backgroundColor: "#2196F3"
        }}
      >
        <Box
          component="img"
          src="/images/logo-infoclinica.png"
          sx={{ mt: "30px" }}
        />

        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
          
          <TextField
            sx={{
              width: "100%",
              marginBottom: "30px",
            }}
            label="username"
            variant="outlined"
            value={values.username}
            onChange={handleChange("username")}
          />
          <FormControl sx={{ width: "100%" }} variant="outlined">
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
          <Button variant="contained" sx={{ paddingX: "20px", mb: "30px", mt: "60px" }} onClick={handleLogin}>
            Entrar
          </Button>
          <Link sx={{ mb: "30px", cursor: "pointer", fontSize: "20px", textAlign: "center" }}>
            Esqueci a minha senha
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default Login;
