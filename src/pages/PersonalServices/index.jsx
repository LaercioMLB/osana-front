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
import ButtonNewService from "./ButtonNewService";
import api from "../../services/api";
import { ToastContainer, toast } from 'react-toastify';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModalDelete from "../../components/Modal/ModalDelete";

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
    setListOS([...listOS, newOSData])
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const convertData = (data) => {
    if (data){
      var newData = data.split("T")[0].split("-").reverse().join("/")
      return newData
    }
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
    // eslint-disable-next-line
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
              <TableCellHeader align="left">Motivo</TableCellHeader>
              <TableCellHeader align="left">Data de Criação</TableCellHeader>
              <TableCellHeader align="left">Status</TableCellHeader>
              <TableCellHeader align="left">Prioridade</TableCellHeader>
              <TableCellHeader align="left"></TableCellHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {listOS.map((row) => (
              <TableRow
                key={row.idOS}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.typeServices.services}
                </TableCell>
                <TableCell align="left">{row.client.name}</TableCell>
                <TableCell align="left">{row.motive}</TableCell>
                <TableCell align="left">{convertData(row.dateOS)}</TableCell>
                <TableCell align="left">
                  <StatusCell sx={{ backgroundColor: ColorStatus(row.status.name) }}>
                    {row.status.name}
                  </StatusCell>
                </TableCell>
                <TableCell align="left">
                  <PrioridadeCell
                    sx={{ backgroundColor: ColorPrioridade(row.priority.name) }}
                  >
                    {row.priority.name}
                  </PrioridadeCell>
                </TableCell>
                <TableCell align="left">
                  <MoreVertIcon
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    sx={{ cursor: "pointer" }}
                  />

                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem>
                      {/* <ModalEdit /> */}
                    </MenuItem>
                    <MenuItem>
                      <ModalDelete />
                    </MenuItem>
                  </Menu>
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
