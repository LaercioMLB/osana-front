import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { UserContextProvider } from "./context/UserContext";

export default function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route element={<Login />} path="/" />
        <Route element={<Home />} path="/home" />
      </Routes>
    </UserContextProvider>
  );
}
