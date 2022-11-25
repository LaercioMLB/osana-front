import { Box, Button, Link, TextField } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

const LoginBox = styled(Box)(({ theme }) => ({
  margin: "auto",
  height: "700px",
  maxWidth: "575px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "column",
  marginTop: "100px",
  borderRadius: "5px",
  boxShadow: "0px 4px 100px rgba(0, 0, 0, 0.25)",
  padding: "20px",
}));

const Logo = styled(Box)(({ theme }) => ({
  marginTop: "30px",
}));

const InputBox = styled(Box)(({ theme }) => ({
  width: "75%",
  display: "flex",
  flexDirection: "column",
}));

const InputUsername = styled(TextField)(({ theme }) => ({
  width: "100%",
  marginBottom: "30px",
}));

const ButtonBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

const ButtonLogin = styled(Button)(({ theme }) => ({
  paddingX: "20px",
  marginBottom: "30px",
}));

const ForgetPassword = styled(Link)(({ theme }) => ({
  mb: "30px",
  cursor: "pointer",
  fontSize: "20px",
}));

export {
  LoginBox,
  Logo,
  InputBox,
  InputUsername,
  ButtonBox,
  ButtonLogin,
  ForgetPassword,
};
