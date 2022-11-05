import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { NavBarBox, ItemNavBar, SubItemNavBar } from "./styles";
import nav from "./nav";

export default function TemporaryDrawer() {
  const [userData] = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <NavBarBox
      sx={userData.openDrawer ? { width: "250px" } : { width: "75px" }}
    >
      {nav.map((item) => (
        <>
          <ItemNavBar onClick={() => navigate(item.path)}>
            {item.icon}
            {userData.openDrawer && item.name}
          </ItemNavBar>
          {userData.openDrawer &&
            item.subItem &&
            item.subItem.map((subItem) => (
              <SubItemNavBar>{subItem.name}</SubItemNavBar>
            ))}
        </>
      ))}
    </NavBarBox>
  );
}
