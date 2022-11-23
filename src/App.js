import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { UserContextProvider } from "./context/UserContext";
import { FilterContextProvider } from "./context/FilterContext";

export default function App() {
  return (
    <UserContextProvider>
      <FilterContextProvider>
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={            
            !localStorage.getItem('token') ? (
              <Navigate to="/login" />
            ) : (
              <Navigate to="/" />
            )
          } path="/" />
        </Routes>
      </FilterContextProvider>
    </UserContextProvider>
  );
}
