import React,{createContext} from 'react';
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const value = {
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export default AppContextProvider;
