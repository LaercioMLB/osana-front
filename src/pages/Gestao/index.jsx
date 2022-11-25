import React from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { H1 } from "../../components/Text";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

function Gestao() {
  const [values, setValues] = useState({
    amount: "",
    username: "",
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
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <H1>Criar usuario</H1>
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
      <TextField
        sx={{ width: "48%", mt: "10px" }}
        label="Email"
        variant="outlined"
      />
      <Box>
        <Button sx={{ marginY: "30px" }} variant="contained">
          Salvar
        </Button>
      </Box>

      <Divider />
      <H1>Adicionar tipo de serviço</H1>
      <TextField
        sx={{ width: "48%" }}
        label="Tipo de serviço"
        variant="outlined"
      />
      <Box>
        <Button sx={{ marginY: "30px" }} variant="contained">
          Salvar
        </Button>
      </Box>
    </Box>
  );
}

export default Gestao;
