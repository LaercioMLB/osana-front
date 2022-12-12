import * as React from "react";
import Box from "@mui/material/Box";
import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { useContext } from "react";
import FilterContext from "../../context/FilterContext";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function Filter() {
  const [filterData, setFilterData] = useContext(FilterContext);

  const handleChangeFilter = (prop) => (event) => {
    if (event.target.checked) {
      let { tabSelected, filters, searchText } = filterData;
      if (!filters.includes(prop)) {
        setFilterData({ tabSelected, filters: [...filters, prop], searchText });
      }
    } else {
      let { tabSelected, filters, searchText } = filterData;
      const newFilters = filters.filter((el) => el !== prop);
      setFilterData({ tabSelected, filters: newFilters, searchText });
    }
  };

  const handleChangeRadio = (event) => {
    let { tabSelected, searchText } = filterData;
    setFilterData({ tabSelected, filters: event.target.value, searchText });
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
        sx={{ width: "150px", marginBottom: "60px" }}
      />

      {filterData.tabSelected === 0 && (
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">Contratos</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={filterData.filters}
            onChange={handleChangeRadio}
          >
            <FormControlLabel value="true" control={<Radio />} label="Com Contrato" />
            <FormControlLabel value="false" control={<Radio />} label="Sem Contrato" />
            <FormControlLabel value="all" control={<Radio />} label="Todos" />
          </RadioGroup>
        </FormControl>  
      )}
      {filterData.tabSelected === 1 && (
        <FormGroup>
          <FormControlLabel
            control={<Checkbox onChange={handleChangeFilter("status-3")} />}
            label="Aberto"
          />
          <FormControlLabel
            control={<Checkbox onChange={handleChangeFilter("status-1")} />}
            label="Andamento"
          />
          <FormControlLabel
            control={<Checkbox onChange={handleChangeFilter("status-2")} />}
            label="Finalizado"
          />
          <Divider sx={{ marginY: "10px" }} />
          <FormControlLabel
            control={<Checkbox onChange={handleChangeFilter("priority-2")} />}
            label="Baixa"
          />
          <FormControlLabel
            control={<Checkbox onChange={handleChangeFilter("priority-1")} />}
            label="Alta"
          />
          <FormControlLabel
            control={<Checkbox onChange={handleChangeFilter("priority-3")} />}
            label="Urgente"
          />
        </FormGroup>
      )}
      {filterData.tabSelected === 2 && (
        <FormGroup>
          <FormControlLabel
            control={<Checkbox onChange={handleChangeFilter("status-3")} />}
            label="Aberto"
          />
          <FormControlLabel
            control={<Checkbox onChange={handleChangeFilter("status-1")} />}
            label="Andamento"
          />
          <FormControlLabel
            control={<Checkbox onChange={handleChangeFilter("status-2")} />}
            label="Finalizado"
          />
          <Divider sx={{ marginY: "10px" }} />
          <FormControlLabel
            control={<Checkbox onChange={handleChangeFilter("priority-2")} />}
            label="Baixa"
          />
          <FormControlLabel
            control={<Checkbox onChange={handleChangeFilter("priority-1")} />}
            label="Alta"
          />
          <FormControlLabel
            control={<Checkbox onChange={handleChangeFilter("priority-3")} />}
            label="Urgente"
          />
        </FormGroup>
      )}
    </Box>
  );
}
