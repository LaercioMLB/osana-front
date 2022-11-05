import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { UserContextProvider } from "./context/UserContext";
import Client from "./pages/Client";
import Header from "./components/Header";
import NavBar from "./components/NavBar";

const Content = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
}));

const ContentRoute = styled(Paper)(({ theme }) => ({
  width: "100%",
  margin: "20px",
  padding: "20px",
}));

export default function App() {
  return (
    <UserContextProvider>
      <Header />
      <Content>
        <NavBar />
        <ContentRoute>
          <Routes>
            <Route element={<Login />} path="/" />
            <Route element={<Home />} path="/home" />
            <Route element={<Client />} path="/client" />
          </Routes>
        </ContentRoute>
      </Content>
    </UserContextProvider>
  );
}
