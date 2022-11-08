import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { NavBarBox, ItemNavBar, SubItemNavBar } from "./styles";
import nav from "./nav";
import { Slide } from "@mui/material";
import { Box } from "@mui/system";

export default function TemporaryDrawer() {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <NavBarBox
      sx={
        userData.openDrawer
          ? { width: "250px", transition: "0.4s" }
          : { width: "75px", transition: "0.4s" }
      }
    >
      {nav.map((item) => (
        <>
          <ItemNavBar
            onClick={() => {
              if (item.subItem) {
                setUserData({ ...userData, filter: item.subItem[0].filter });
              }
              navigate(item.path);
            }}
            sx={
              item.path === window.location.pathname && !item.subItem
                ? { backgroundColor: "#42A6F528" }
                : {}
            }
          >
            {item.icon}
            {userData.openDrawer && item.name}
          </ItemNavBar>

          {userData.openDrawer &&
            item.subItem &&
            item.subItem.map((subItem) => (
              <SubItemNavBar
                onClick={() => {
                  navigate(item.path);
                  setUserData({ ...userData, filter: subItem.filter });
                }}
                sx={
                  subItem.filter === userData.filter &&
                  item.path === window.location.pathname
                    ? { backgroundColor: "#42A6F528" }
                    : {}
                }
              >
                {subItem.name}
              </SubItemNavBar>
            ))}
        </>
      ))}
    </NavBarBox>
  );
}
