import { Box, Container } from "@mui/material";
import React from "react";
import Header from "../../components/Header";
import TemporaryDrawer from "../../components/TemporaryDrawer";
import { styles } from "./styles";

function Home() {
  return (
    <Box sx={{ width: "100%" }}>
      <Header />
      <TemporaryDrawer />
    </Box>
  );
}

export default Home;
