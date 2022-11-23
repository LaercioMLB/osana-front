import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { H1 } from "../../components/Text";
import { TableCellHeader, StatusCell, PrioridadeCell } from "./styles";
import { MoreIcon } from "../../components/Buttons";
import ButtonNewService from "./ButtonNewService";

function createData(
  id,
  service,
  client,
  equipamento,
  date,
  hours,
  status,
  prioridade
) {
  return { id, service, client, equipamento, date, hours, status, prioridade };
}

const rows = [
  createData(
    "1",
    "Formatação",
    "Uniamérica",
    "Computador",
    "24/10/22 ",
    "22:10",
    "Andamento",
    "Alta"
  ),
  createData(
    "1",
    "Formatação",
    "Uniamérica",
    "Computador",
    "24/10/22 ",
    "22:10",
    "Andamento",
    "Alta"
  ),
  createData(
    "1",
    "Formatação",
    "Uniamérica",
    "Computador",
    "24/10/22 ",
    "22:10",
    "Andamento",
    "Alta"
  ),
  createData(
    "1",
    "Formatação",
    "Uniamérica",
    "Computador",
    "24/10/22 ",
    "22:10",
    "Andamento",
    "Alta"
  ),
  createData(
    "1",
    "Formatação",
    "Uniamérica",
    "Computador",
    "24/10/22 ",
    "22:10",
    "Aberto",
    "Alta"
  ),
  createData(
    "1",
    "Formatação",
    "Uniamérica",
    "Computador",
    "24/10/22 ",
    "22:10",
    "Finalizado",
    "Alta"
  ),
];

function ColorStatus(status) {
  let color;
  if (status === "Andamento") {
    color = "#E6F819";
  }
  if (status === "Finalizado") {
    color = "#8D8D8D";
  }
  if (status === "Aberto") {
    color = "#1DF819";
  }
  return color;
}

function ColorPrioridade(prioridade) {
  let color;
  if (prioridade === "Alta") {
    color = "#FFC700";
  }
  if (prioridade === "Baixa") {
    color = "#4200FF";
  }
  if (prioridade === "Urgente") {
    color = "#FF0000";
  }
  return color;
}

function PersonalServices() {
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
        <H1>Minhas OS</H1>
        <ButtonNewService />
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCellHeader align="left">Id</TableCellHeader>
              <TableCellHeader>Serviço</TableCellHeader>
              <TableCellHeader align="left">Cliente</TableCellHeader>
              <TableCellHeader align="left">Equipamento</TableCellHeader>
              <TableCellHeader align="left">Data/Hora</TableCellHeader>
              <TableCellHeader align="left">Status</TableCellHeader>
              <TableCellHeader align="left">Prioridade</TableCellHeader>
              <TableCellHeader align="left"></TableCellHeader>
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
                  {row.service}
                </TableCell>
                <TableCell align="left">{row.client}</TableCell>
                <TableCell align="left">{row.equipamento}</TableCell>
                <TableCell align="left">{row.date}</TableCell>
                <TableCell align="left">
                  <StatusCell sx={{ backgroundColor: ColorStatus(row.status) }}>
                    {row.status}
                  </StatusCell>
                </TableCell>
                <TableCell align="left">
                  <PrioridadeCell
                    sx={{ backgroundColor: ColorPrioridade(row.prioridade) }}
                  >
                    {row.prioridade}
                  </PrioridadeCell>
                </TableCell>
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

export default PersonalServices;
