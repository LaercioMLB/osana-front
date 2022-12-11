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
import { H1 } from "../../../components/Text";
import ButtonNewUser from "../Buttons/ButtonNewUser";
import DeleteUser from "../Modals/Users/DeleteUser";
import EditUser from "../Modals/Users/EditUser";
import ViewUser from "../Modals/Users/ViewUser";
import Paper from '@mui/material/Paper';
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import { useContext } from "react";
// import FilterContext from "../../context/FilterContext";
import Menu from "@mui/material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

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
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Nome',
  },
  {
    id: 'username',
    numeric: false,
    disablePadding: false,
    label: 'UserName',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'E-mail',
  },
  {
    id: 'authority',
    numeric: false,
    disablePadding: false,
    label: 'Autorização',
  },
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: 'Opções',
  },
];

function PositionedMenu({ row, deleteUser, editUser }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
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
        <ViewUser user={row} handleCloseMenu={handleClose}/>
        <EditUser user={row} editUser={editUser} handleCloseMenu={handleClose}/>
        <DeleteUser idUser={row.id} nameUser={row.name} deleteUser={deleteUser} handleCloseMenu={handleClose}/>
      </Menu>
    </div>
  );
}

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

function TableUsers() {
  const navigate = useNavigate();
  // const [filterData] = useContext(FilterContext);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [numberOfElements, setNumberOfElements] = useState(0);
  const [rows, setRows] = useState([]);
  const [textSearch, setTextSearch] = useState("");

  const createNewUser = () => {
    getUsers({ size: rowsPerPage, page: page })
  }

  const deleteUser = () => {
    getUsers({ size: rowsPerPage, page: page })
  }

  const editUser = (editedUser) => {
    const index = rows.findIndex((user) => user.id === editedUser.id)
    let newListUsers = [...rows]
    newListUsers[index] = editedUser
    setRows(newListUsers);
  }

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  async function getUsers({ size, page }){
    await api.get(`/users?size=${size}&page=${page}`, config)
      .then((response) => {
        setRows(response.data.content)
        setNumberOfElements(response.data.totalElements)
        setPage(response.data.number)
        setRowsPerPage(size)
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

  async function getUsersSearch({ size, page, name }){
    await api.get(`/users/findByName?size=${size}&page=${page}&name=${name}`, config)
      .then((response) => {
        setRows(response.data.content)
        setNumberOfElements(response.data.totalElements)
        setPage(response.data.number)
        setRowsPerPage(size)
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
      getUsers({ size: 5, page: 0 });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    getUsers({ size: rowsPerPage, page: newPage });
  };

  const handleChangeRowsPerPage = (event) => {
    getUsers({ size: parseInt(event.target.value, 10), page: 0 });
  };

  const handleSearch = () => {
    if (textSearch.length > 0){
      getUsersSearch({ size: rowsPerPage, page: 0, name: textSearch });
    }else{
      getUsers({ size: rowsPerPage, page: 0 });
    }
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
        <H1>Usuários</H1>
        <ButtonNewUser createNewUser={createNewUser} />
      </Box>

      <TextField
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton size="large" component={'span'} aria-label="search" color="inherit" onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        fullWidth
        label="Pesquisar Pelo Nome"
        placeholder="Digite o Nome do Usuário"
        sx={{ marginY: "20px" }}
        value={textSearch}
        onChange={event => setTextSearch(event.target.value)}
        onKeyDown={event => {
          if(event.key === 'Enter'){
            handleSearch();
          }
        }}
      />

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
                          {row.name}
                        </TableCell>
                        <TableCell align="left">{row.username}</TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="left">{row.roles[0].authority.split("_")[1]}</TableCell>
                        <TableCell align="left">
                          <PositionedMenu row={row} deleteUser={deleteUser} editUser={editUser}/>
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

export default TableUsers;
