import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Menu from "@mui/material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOS from "../PersonalServices/DeleteOS";
import EditOS from "../PersonalServices/EditOS";
import ViewOS from "../PersonalServices/ViewOS";
import { StatusCell, PrioridadeCell } from "./styles";
import FilterContext from "../../context/FilterContext";

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
    id: 'motive',
    numeric: false,
    disablePadding: false,
    label: 'Motivo',
  },
  {
    id: 'dateOS',
    numeric: false,
    disablePadding: false,
    label: 'Data de Abertura',
  },
  {
    id: 'usuario',
    numeric: false,
    disablePadding: false,
    label: 'Aberto Por:',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'priority',
    numeric: false,
    disablePadding: false,
    label: 'Prioridade',
  },
  {
    id: 'typeServices',
    numeric: false,
    disablePadding: false,
    label: 'Tipo do Serviço',
  },
  {
    id: 'client',
    numeric: false,
    disablePadding: false,
    label: 'Cliente',
  },
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: 'Ações',
  },
];

function PositionedMenu({ row, deleteOS, editOS, idUsuario }) {
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
        <ViewOS osObj={row}  handleCloseMenu={handleClose}/>
        <EditOS idUsuario={idUsuario} osObj={row} editOS={editOS} handleCloseMenu={handleClose}/>
        <DeleteOS idOS={row.idOS} deleteOS={deleteOS} handleCloseMenu={handleClose}/>
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

export default function Services({ idUsuario }) {
  const navigate = useNavigate();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('dateOS');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [numberOfElements, setNumberOfElements] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [filterData] = React.useContext(FilterContext);

  const deleteOS = () => {
    getListOs({ size: rowsPerPage, page: page })
  }
  
  const editOS = (editedOS) => {
    const index = rows.findIndex((os) => os.idOS === editedOS.idOS)
    let newListOs = [...rows]
    newListOs[index] = editedOS
    setRows(newListOs);
  }
  const config = {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
    },
  };

  async function getListOs({ size, page }){
    await api.get(`/os?size=${size}&page=${page}`, config)
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

  async function getListOsSearch({ size, page, status, priority }){
    let url = ""
    let statusValues = status.map((value) => value.split("-")[1])
    let priorityValues = priority.map((value) => value.split("-")[1])

    if (status.length > 0 && priority.length > 0){
      url = `/os/filterOs?size=${size}&page=${page}&status=${statusValues}&priority=${priorityValues}`
    }else if(priority.length > 0){
      url = `/os/filterOs?size=${size}&page=${page}&priority=${priorityValues}`
    }else{
      url = `/os/filterOs?size=${size}&page=${page}&status=${statusValues}`
    }
    await api.get(url, config)
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

  React.useEffect(()=>{
    if(filterData.tabSelected === 2 && filterData.filters.length > 0){
      let status = filterData.filters.filter((status) => status.includes("status"))
      let prioridade = filterData.filters.filter((priority) => priority.includes("priority"))
      getListOsSearch({ size: rowsPerPage, page: 0, status: status, priority: prioridade })
    }else if (filterData.tabSelected === 2 && filterData.filters.length === 0){
      getListOs({ size: 5, page: 0 });
    }
    // eslint-disable-next-line
  }, [filterData])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    getListOs({ size: rowsPerPage, page: newPage });
  };

  const handleChangeRowsPerPage = (event) => {
    getListOs({ size: parseInt(event.target.value, 10), page: 0 });
  };

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

  const convertData = (data) => {
    if (data){
      var newData = data.split("T")[0].split("-").reverse().join("/")
      return newData
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <ToastContainer />
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
                      key={row.idOS}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                      >
                        {row.motive}
                      </TableCell>
                      <TableCell align="left">{convertData(row.dateOS)}</TableCell>
                      <TableCell align="left">{row.usuario.name}</TableCell>
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
                      <TableCell align="left">{row.typeServices.services}</TableCell>

                      <TableCell align="left">{row.client.firstName}</TableCell>
                      <TableCell align="left">
                        <PositionedMenu row={row} idUsuario={idUsuario} deleteOS={deleteOS} editOS={editOS}/>
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
  );
}
