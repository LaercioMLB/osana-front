import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
export default function App() {
  return (
    <Routes>
      <Route element={<Login />} path="/" />
    </Routes>
  );
}
