import React, { createContext, useState } from "react";

export const FilterContext = createContext([{}, () => {}]);

export function FilterContextProvider(props) {
  const [filterData, setFilterData] = useState({
    tabSelected: 0,
  });

  return (
    <FilterContext.Provider value={[filterData, setFilterData]}>
      {props.children}
    </FilterContext.Provider>
  );
}

export default FilterContext;
