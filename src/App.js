import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { UserContextProvider } from "./context/UserContext";
import { FilterContextProvider } from "./context/FilterContext";

export default function App() {
  return (
    <UserContextProvider>
      <FilterContextProvider>
        <Routes>
          <Route element={<Login />} path="/entrar" />
          <Route element={<Home />} path="/*" />
        </Routes>
      </FilterContextProvider>
    </UserContextProvider>
  );
}
