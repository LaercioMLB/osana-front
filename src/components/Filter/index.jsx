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

  const handleChangeFilter = (prop) => (event) => {
    if (event.target.checked){
      let { tabSelected, filters } = filterData
      if (!filters.includes(prop)){
        setFilterData({ tabSelected, filters: [...filters, prop]})
      }
    }else{
      let { tabSelected, filters } = filterData
      const newFilters = filters.filter((el) => el !== prop)
      setFilterData({ tabSelected, filters: newFilters })
    }
  };

  return (
    <Box
      sx={{
        display: { xs: "none", sm: "block" },
        width: "250px",
        padding: "30px",
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
          <FormControlLabel control={<Checkbox onChange={handleChangeFilter("Com contrato")}/>} label="Com contrato" />
          <FormControlLabel control={<Checkbox onChange={handleChangeFilter("Sem contrato")}/>} label="Sem contrato" />
        </FormGroup>
      )}
      {filterData.tabSelected === 1 && (
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Todos"
          />
          <FormControlLabel control={<Checkbox onChange={handleChangeFilter("Aberto")} />} label="Aberto" />
          <FormControlLabel control={<Checkbox onChange={handleChangeFilter("Andamento")} />} label="Andamento" />
          <FormControlLabel control={<Checkbox onChange={handleChangeFilter("Finalizado")} />} label="Finalizado" />
          <Divider sx={{ marginY: "10px" }} />
          <FormControlLabel control={<Checkbox onChange={handleChangeFilter("Baixa")} />} label="Baixa" />
          <FormControlLabel control={<Checkbox onChange={handleChangeFilter("Alta")} />} label="Alta" />
          <FormControlLabel control={<Checkbox onChange={handleChangeFilter("Urgente")} />} label="Urgente" />
        </FormGroup>
      )}
      {filterData.tabSelected === 2 && (
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Todos"
          />
          <FormControlLabel control={<Checkbox onChange={handleChangeFilter("Com contrato")} />} label="Com contrato" />
          <FormControlLabel control={<Checkbox onChange={handleChangeFilter("Sem contrato")} />} label="Sem contrato" />
        </FormGroup>
      )}
    </Box>
  );
}
