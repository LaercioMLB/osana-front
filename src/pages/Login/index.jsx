import {
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import {
  LoginBox,
  Logo,
  InputBox,
  InputUsername,
  ButtonBox,
  ButtonLogin,
  ForgetPassword,
} from "./styles";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleLogin = async () => {
    navigate("/home");
    //TODO colocar validação de email e preparar um componente de tela de carregamento
  };

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
  return (
    <Container maxWidth={false}>
      <LoginBox>
        <Logo component="img" src="/images/logo-infoclinica.png" />
        <InputBox>
          <InputUsername label="username" variant="outlined" />
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
        </InputBox>
        <ButtonBox>
          <ButtonLogin variant="contained" onClick={handleLogin}>
            Entrar
          </ButtonLogin>
          <ForgetPassword>Esqueci a minha senha</ForgetPassword>
        </ButtonBox>
      </LoginBox>
    </Container>
  );
}

export default Login;
