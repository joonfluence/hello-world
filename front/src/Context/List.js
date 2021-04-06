import React, { useState } from "react";

export const ListContext = React.createContext({
  state: { list: [] },
  actions: {
    setList: () => {},
  },
});

const ListProvider = ({ children }) => {
  const [list, setList] = useState([]);
  const value = {
    state: { list },
    actions: { setList },
  };

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};

const { Consumer: ListConsumer } = ListContext;

export { ListProvider, ListConsumer };

export default ListContext;
