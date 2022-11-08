import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { UserContextProvider } from "./context/UserContext";

const ContentRoute = styled(Paper)(({ theme }) => ({
  width: "100%",
  margin: "20px",
  padding: "20px",
}));

export default function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route element={<Login />} path="/entrar" />
        <Route element={<Home />} path="/*" />
      </Routes>
    </UserContextProvider>
  );
}
