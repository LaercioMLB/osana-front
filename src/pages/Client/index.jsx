import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { H1 } from "../../components/Text";
import { TableCellHeader } from "./styles";
import { MoreIcon } from "../../components/Buttons";
import ButtonNewClient from "./ButtonNewClient";

function createData(id, name, email, cpfcnpj, phone, options) {
  return { id, name, email, cpfcnpj, phone, options };
}

const rows = [
  createData(
    "1",
    "Ana Luiza França dos Santos",
    "A.francaxavier@gmail.com",
    "755.708.970-70",
    "45 91234-5678",
    "mudar"
  ),
  createData(
    "2",
    "Ana Luiza França dos Santos",
    "A.francaxavier@gmail.com",
    "755.708.970-70",
    "45 91234-5678",
    "mudar"
  ),
  createData(
    "3",
    "Ana Luiza França dos Santos",
    "A.francaxavier@gmail.com",
    "755.708.970-70",
    "45 91234-5678",
    "mudar"
  ),
  createData(
    "4",
    "Ana Luiza França dos Santos",
    "A.francaxavier@gmail.com",
    "755.708.970-70",
    "45 91234-5678",
    "mudar"
  ),
  createData(
    "5",
    "Ana Luiza França dos Santos",
    "A.francaxavier@gmail.com",
    "755.708.970-70",
    "45 91234-5678",
    "mudar"
  ),
  createData(
    "6",
    "Ana Luiza França dos Santos",
    "A.francaxavier@gmail.com",
    "755.708.970-70",
    "45 91234-5678",
    "mudar"
  ),
];

function Client() {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <H1>Clientes</H1>
        <ButtonNewClient />
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCellHeader align="left">Id</TableCellHeader>
              <TableCellHeader>Nome</TableCellHeader>
              <TableCellHeader align="left">Email</TableCellHeader>
              <TableCellHeader align="left">CNPJ/CPF</TableCellHeader>
              <TableCellHeader align="left">Telefone</TableCellHeader>
              <TableCellHeader align="left">Opções</TableCellHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{row.id}</TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.cpfcnpj}</TableCell>
                <TableCell align="left">{row.phone}</TableCell>
                <TableCell align="left">
                  <MoreIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Client;
