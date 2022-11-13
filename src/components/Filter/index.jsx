import * as React from "react";
import Box from "@mui/material/Box";
import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { useContext } from "react";
import FilterContext from "../../context/FilterContext";

export default function Filter() {
  const [filterData, setFilterData] = useContext(FilterContext);
  return (
    <Box
      sx={{
        display: { xs: "none", sm: "block" },
        width: "250px",
        padding: "10px",
        borderRight: "1px solid #D1D1D1",
        height: "100vh",
      }}
    >
      <Box
        component="img"
        src="/images/logo-infoclinica.png"
        sx={{ width: "150px" }}
      />
      <TextField
        fullWidth
        label="Pesquisar"
        placeholder="O que procura?"
        sx={{ marginY: "30px" }}
      />

      {filterData.tabSelected === 0 && (
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Todos"
          />
          <FormControlLabel control={<Checkbox />} label="Com contrato" />
          <FormControlLabel control={<Checkbox />} label="Sem contrato" />
        </FormGroup>
      )}
      {filterData.tabSelected === 1 && (
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Todos"
          />
          <FormControlLabel control={<Checkbox />} label="Aberto" />
          <FormControlLabel control={<Checkbox />} label="Andamento" />
          <FormControlLabel control={<Checkbox />} label="Finalizado" />
          <Divider sx={{ marginY: "10px" }} />
          <FormControlLabel control={<Checkbox />} label="Baixa" />
          <FormControlLabel control={<Checkbox />} label="Alta" />
          <FormControlLabel control={<Checkbox />} label="Urgente" />
        </FormGroup>
      )}
      {filterData.tabSelected === 2 && (
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Todos"
          />
          <FormControlLabel control={<Checkbox />} label="Com contrato" />
          <FormControlLabel control={<Checkbox />} label="Sem contrato" />
        </FormGroup>
      )}
    </Box>
  );
}
