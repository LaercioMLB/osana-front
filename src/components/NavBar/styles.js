import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const NavBarBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#ffff",
  width: "75px",
  height: "93.5vh",
}));

const ItemNavBar = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  color: "#757575",
  cursor: "pointer",
  padding: "10px 20px 20px 20px",
}));
const SubItemNavBar = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  color: "#757575",
  cursor: "pointer",
  padding: "5px",
  marginLeft: "55px",
}));

export { NavBarBox, ItemNavBar, SubItemNavBar };
