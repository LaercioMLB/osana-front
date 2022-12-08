import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/material";
import { H1 } from "../../../components/Text";
import ButtonNewEquipment from "../Buttons/ButtonNewEquipment";
import { MoreIcon } from "../../../components/Buttons";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { useEffect } from "react";
import ModalDelete from "../../../components/Modal/ModalDelete";

const columns = [
  { id: "id", label: "Id", minWidth: 80 },
  { id: "name", label: "Equipamento", minWidth: 100 },
  { id: "model", label: "Modelo", minWidth: 100 },
  {
    id: "options",
    label: "Deletar",
    minWidth: 170,
    align: "right",
  },
];

function createData(id, equipment, options) {
  return { id, equipment, options };
}

const rows = [createData(1, "Formatação", <MoreIcon />)];

export default function TableEquipment() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [listEquipment, setListEquipment] = React.useState();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  async function getEquipmentList() {
    await api
      .get("/equipment")
      .then((response) => {
        setListEquipment(response.data);
      })
      .catch((error) => {
        toast.error("Algo deu errado !");
      });
  }

  useEffect(() => {
    getEquipmentList();
  }, []);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <H1>Equipamento</H1>
        <ButtonNewEquipment />
      </Box>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {listEquipment &&
              listEquipment
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return column.id === "options" ? (
                          <TableCell key={column.id} align={column.align}>
                            <ModalDelete enableIcon={true} />
                          </TableCell>
                        ) : (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
