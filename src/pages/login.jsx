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
import React from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Login() {
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
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
  return (
    <Box
      sx={{
        marginX: "auto",
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
      }}
    >
      <Box
        component="img"
        src="/images/logo-infoclinica.png"
        sx={{ mt: "30px" }}
      />

      <Box sx={{ width: "75%", display: "flex", flexDirection: "column" }}>
        <TextField
          sx={{
            width: "100%",
            marginBottom: "30px",
          }}
          label="username"
          variant="outlined"
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
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Button variant="contained" sx={{ paddingX: "20px", mb: "30px" }}>
          Entrar
        </Button>
        <Link sx={{ mb: "30px", cursor: "pointer", fontSize: "20px" }}>
          Esqueci a minha senha
        </Link>
      </Box>
    </Box>
  );
}

export default Login;
