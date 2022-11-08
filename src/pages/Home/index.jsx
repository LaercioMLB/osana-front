import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import Client from "../Client";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import Services from "../Services";
import PersonalServices from "../PersonalServices";
import Suport from "../Suport";

const Content = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
}));

const ContentRoute = styled(Paper)(({ theme }) => ({
  width: "100%",
  margin: "10px",
  padding: "10px",
}));

export default function Home() {
  return (
    <>
      <Header />
      <Content>
        <NavBar />
        <ContentRoute>
          <Routes>
            <Route element={<Client />} path="/" />
            <Route element={<Client />} path="/clientes" />
            <Route element={<Services />} path="/atendimentos" />
            <Route element={<PersonalServices />} path="/meus-atendimentos" />
            <Route element={<Suport />} path="/suporte" />
          </Routes>
        </ContentRoute>
      </Content>
    </>
  );
}
