import React, { useState, useContext } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import TableUsers from "./Tables/TableUsers";
import TableServices from "./Tables/TableServices";
import TableEquipment from "./Tables/TableEquipment";
import TableEstoque from "./Tables/TableEstoque";
import FilterContext from "../../context/FilterContext";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{}}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Gestao() {
  const [subTab, setSubTab] = useState(0);
  const [filterData, setFilterData] = useContext(FilterContext);

  const handleChange = (event, newValue) => {
    setFilterData({ ...filterData, searchText: '' });
    setSubTab(newValue);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Tabs value={subTab} onChange={handleChange} aria-label="basic tabs">
        <Tab label="Usuarios" {...a11yProps(0)} />
        <Tab label="Serviços" {...a11yProps(1)} />
        <Tab label="Equipamentos" {...a11yProps(2)} />
        <Tab label="Estoque" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={subTab} index={0}>
        <TableUsers />
      </TabPanel>
      <TabPanel value={subTab} index={1}>
        <TableServices />
      </TabPanel>
      <TabPanel value={subTab} index={2}>
        <TableEquipment />
      </TabPanel>
      <TabPanel value={subTab} index={3}>
        <TableEstoque />
      </TabPanel>
    </Box>
  );
}

export default Gestao;
