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

function Services() {
  return (
    <Box>
      <H1>Todas OS</H1>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCellHeader>Nome</TableCellHeader>
              <TableCellHeader align="right">Email</TableCellHeader>
              <TableCellHeader align="right">CNPJ/CPF</TableCellHeader>
              <TableCellHeader align="right">Telefone</TableCellHeader>
              <TableCellHeader align="right">Opções</TableCellHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.cpfcnpj}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                <TableCell align="right">{row.options}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Services;
