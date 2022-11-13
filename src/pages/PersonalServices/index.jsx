import React from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { H1 } from "../../components/Text";
import { TableCellHeader } from "./styles";
import AddIcon from "@mui/icons-material/Add";

function createData(name, email, cpfcnpj, phone, options) {
  return { name, email, cpfcnpj, phone, options };
}

const rows = [
  createData(
    "Ana Luiza França dos Santos",
    "A.francaxavier@gmail.com",
    "755.708.970-70",
    "45 91234-5678",
    "mudar"
  ),
  createData(
    "Ana Luiza França dos Santos",
    "A.francaxavier@gmail.com",
    "755.708.970-70",
    "45 91234-5678",
    "mudar"
  ),
  createData(
    "Ana Luiza França dos Santos",
    "A.francaxavier@gmail.com",
    "755.708.970-70",
    "45 91234-5678",
    "mudar"
  ),
  createData(
    "Ana Luiza França dos Santos",
    "A.francaxavier@gmail.com",
    "755.708.970-70",
    "45 91234-5678",
    "mudar"
  ),
  createData(
    "Ana Luiza França dos Santos",
    "A.francaxavier@gmail.com",
    "755.708.970-70",
    "45 91234-5678",
    "mudar"
  ),
  createData(
    "Ana Luiza França dos Santos",
    "A.francaxavier@gmail.com",
    "755.708.970-70",
    "45 91234-5678",
    "mudar"
  ),
];

function PersonalServices() {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          flexDirection: "row",
        }}
      >
        <H1>Minhas OS</H1>
        <Button
          sx={{ height: "40px" }}
          variant="contained"
          startIcon={<AddIcon />}
        >
          Nova OS
        </Button>
      </Box>

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
                key={row.name}
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

export default PersonalServices;
