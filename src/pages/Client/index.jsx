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
import ButtonNewClient from "./ButtonNewClient";
import DeleteClient from "./DeleteClient";
import EditClient from "./EditClient";
import ViewClient from "./ViewClient";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useContext } from "react";
import FilterContext from "../../context/FilterContext";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function Client() {
  const navigate = useNavigate();
  const [listClients, setListClients] = useState([]);
  const [filterData] = useContext(FilterContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const createNewClient = (newClientData) => {
    setListClients([...listClients, newClientData])
  }

  const deleteClient = (deletedClientId) => {
    setListClients(listClients.filter((client) => client.id !== deletedClientId))
    setAnchorEl(null);
  }

  const editClient = (editedClient) => {
    const newListClients = listClients.filter((client) => client.id !== editedClient.id)
    setListClients([...newListClients, editedClient])
    setAnchorEl(null);
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  async function getClients() {
    await api
      .get("/client", config)
      .then((response) => setListClients(response.data))
      .catch((error) => {
        if (error.response.status === 403) {
          localStorage.clear();
          navigate("/login");
        } else {
          toast.error("Algo deu errado !");
        }
      });
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getClients();
    }
  }, []);

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
        <ButtonNewClient createNewClient={createNewClient}/>
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
            {listClients.map((client) =>
              filterData.filters.length !== 0 ? (
                filterData.filters.includes(client.contract) ? (
                  <TableRow
                    key={client.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {client.firstName} {client.lastName !== null ? client.lastName : ""}
                    </TableCell>
                    <TableCell align="left">{client.cnpj}</TableCell>
                    <TableCell align="left">{client.contract === "true" ? "Tem Contrato" : "Não Tem Contrato"}</TableCell>
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
                          <ViewClient client={client} />
                        </MenuItem>
                        <MenuItem>
                          <EditClient client={client} editClient={editClient} />
                        </MenuItem>
                        <MenuItem>
                          <DeleteClient idClient={client.id} nameCliente={client.firstName} deleteClient={deleteClient}/>
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )
              ) : (
                <TableRow
                  key={client.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {client.firstName} {client.lastName !== null ? client.lastName : ""}
                  </TableCell>
                  <TableCell align="left">{client.cnpj}</TableCell>
                  <TableCell align="left">{client.contract === "true" ? "Tem Contrato" : "Não Tem Contrato"}</TableCell>
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
                        <ViewClient client={client} />
                      </MenuItem>
                      <MenuItem>
                        <EditClient client={client} editClient={editClient} />
                      </MenuItem>
                      <MenuItem>
                        <DeleteClient idClient={client.id} nameCliente={client.firstName} deleteClient={deleteClient}/>
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Client;
