import { Box, TableCell } from "@mui/material";
import { styled } from "@mui/material/styles";

const TableCellHeader = styled(TableCell)(({ theme }) => ({
  fontWeight: 700,
}));

const StatusCell = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingX: "5px",
  paddingY: "2px",
  borderRadius: "10px",
  width: "100px",
}));

const PrioridadeCell = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingX: "5px",
  color: "#FFF",
  paddingY: "2px",
  borderRadius: "10px",
  width: "60px",
}));

export { TableCellHeader, StatusCell, PrioridadeCell };
