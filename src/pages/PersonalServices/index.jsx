import React, { useState, useEffect } from "react";
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
import { TableCellHeader, StatusCell, PrioridadeCell } from "./styles";
import { MoreIcon } from "../../components/Buttons";
import ButtonNewService from "../../components/Buttons/ButtonNewService/ButtonNewService";
import api from "../../services/api";
import { ToastContainer, toast } from 'react-toastify';

const rows = [
  (
    "1",
    "Formatação",
    "Uniamérica",
    "Computador",
    "24/10/22 ",
    "22:10",
    "Andamento",
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

function PersonalServices({ idUsuario }) {
  const [ listOS, setListOS ] = useState([]);

  const createNewOS = (newOSData) => {
    console.log(newOSData)
  }

  const config = {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": "application/json", 
    },
  };

  async function getListMyOs(){
    await api.get(`/os/findOSByUser/${idUsuario}`, config)
      .then((response) => {
        setListOS(response.data)
      })
      .catch((error) => {
          toast.error(error.response.data)
        }
      );
  }

  useEffect(()=>{
    if (localStorage.getItem('token')){
      getListMyOs();
    }
  }, [])

  return (
    <Box>
      <ToastContainer />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <H1>Minhas OS</H1>
        <ButtonNewService idUsuario={idUsuario} createNewOS={createNewOS} />
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
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
