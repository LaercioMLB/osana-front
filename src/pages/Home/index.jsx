import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Client from "../Client";
import PersonalServices from "../PersonalServices";
import Services from "../Services";
import { AccountButton } from "../../components/Buttons";
import Filter from "../../components/Filter";
import UserContext from "../../context/UserContext";
import { useContext } from "react";
import Gestao from "../Gestao";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Home() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [userData] = useContext(UserContext);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  React.useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
      <Filter />
      <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottom: 1,
            borderColor: "divider",
            paddingX: "10px",
          }}
        >
          <Tabs value={tab} onChange={handleChange} aria-label="basic tabs">
            <Tab label="Clientes" {...a11yProps(0)} />
            <Tab label="Minhas OS" {...a11yProps(1)} />
            <Tab label="Todas OS" {...a11yProps(2)} />
            {userData.isGestor ? <Tab label="Gestão" {...a11yProps(3)} /> : ""}
          </Tabs>
          <AccountButton />
        </Box>
        <TabPanel value={tab} index={0}>
          <Client />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <PersonalServices idUsuario={userData.user.id} />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <Services />
        </TabPanel>
        {userData.isGestor ? (
          <TabPanel value={tab} index={3}>
            <Gestao />
          </TabPanel>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
}
