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
import PropTypes from 'prop-types';
import { H1 } from "../../components/Text";
import ButtonNewClient from "./ButtonNewClient";
import DeleteClient from "./DeleteClient";
import EditClient from "./EditClient";
import ViewClient from "./ViewClient";
import Paper from '@mui/material/Paper';
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import { useContext } from "react";
// import FilterContext from "../../context/FilterContext";
import Menu from "@mui/material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: 'firstName',
    numeric: false,
    disablePadding: false,
    label: 'Nome',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'CNPJ/CPF',
  },
  {
    id: 'phone',
    numeric: false,
    disablePadding: false,
    label: 'CNPJ/CPF',
  },
  {
    id: 'contract',
    numeric: false,
    disablePadding: false,
    label: 'Contrato',
  },
  {
    id: 'cnpj',
    numeric: false,
    disablePadding: false,
    label: 'CNPJ/CPF',
  },
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: 'Opções',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

function Client() {
  const navigate = useNavigate();
  // const [filterData] = useContext(FilterContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('firstName');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [numberOfElements, setNumberOfElements] = useState(0);
  const [rows, setRows] = useState([]);
  const open = Boolean(anchorEl);

  const createNewClient = (newClientData) => {
    setRows([...rows, newClientData])
  }

  const deleteClient = (deletedClientId) => {
    setRows(rows.filter((client) => client.id !== deletedClientId))
    setAnchorEl(null);
  }

  const editClient = (editedClient) => {
    const newListClients = rows.filter((client) => client.id !== editedClient.id)
    setRows([...newListClients, editedClient])
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

  async function getClients({ size, page }){
    await api.get(`/client?size=${size}&page=${page}`, config)
      .then((response) => {
        setRows(response.data.content)
        setNumberOfElements(response.data.totalElements)
        setPage(response.data.number)
        setRowsPerPage(response.data.size)
      })
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
    if (localStorage.getItem("token")) {
      getClients({ size: 5, page: 0 });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    getClients({ size: rowsPerPage, page: newPage });
  };

  const handleChangeRowsPerPage = (event) => {
    getClients({ size: parseInt(event.target.value, 10), page: 0 });
  };

  return (
    <>
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
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size='medium'
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {rows.sort(getComparator(order, orderBy)).slice().map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                        >
                          {row.firstName} {row.lastName}
                        </TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="left">{row.phone}</TableCell>
                        <TableCell align="left">{row.contract === 'true' ? "Tem Contrato" : "Não Tem Contrato"}</TableCell>
                        <TableCell align="left">{row.cnpj}</TableCell>
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
                            <ViewClient client={row} />
                            <EditClient client={row} editClient={editClient} />
                            <DeleteClient idClient={row.id} nameCliente={row.firstName} deleteClient={deleteClient}/>
                          </Menu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={numberOfElements}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );
}

export default Client;
