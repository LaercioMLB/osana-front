import React, { createContext, useState } from "react";

export const OsContext = createContext([{}, () => {}]);

export function OsContextProvider(props) {
  const [osData, setOsData] = useState({});
  return (
    <OsContext.Provider value={[osData, setOsData]}>
      {props.children}
    </OsContext.Provider>
  );
}

export default OsContext;
