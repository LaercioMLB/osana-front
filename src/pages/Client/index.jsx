import React, { useEffect, useState } from "react";
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
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

function Client() {
  const navigate = useNavigate();
  const [ listClients, setListClients ] = useState([]);

  const config = {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
    },
  };

  async function getClients(){
    await api.get('/client', config)
      .then((response) => setListClients(response.data))
      .catch((error) => {
          if (error.response.status === 403){
            localStorage.clear()
            navigate("/login")
          }else{
            toast.error("Algo deu errado !")
          }
        }
      );
  }

  useEffect(() => {
    if (localStorage.getItem('token')){
      getClients();
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
        <H1>Clientes</H1>
        <ButtonNewClient />
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCellHeader>Nome</TableCellHeader>
              <TableCellHeader align="left">CNPJ/CPF</TableCellHeader>
              <TableCellHeader align="left">Contrato</TableCellHeader>
              <TableCellHeader align="left">Opções</TableCellHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {listClients.map((client) => (
              <TableRow
                key={client.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {client.name}
                </TableCell>
                <TableCell align="left">{client.cnpj}</TableCell>
                <TableCell align="left">{client.contract}</TableCell>
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
