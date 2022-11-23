import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext([{}, () => {}]);

export function UserContextProvider(props) {
  const [userData, setUserData] = useState({
    openDrawer: false,
    filter: "",
  });

  return (
    <UserContext.Provider value={[userData, setUserData]}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
