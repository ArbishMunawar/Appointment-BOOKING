import React, { createContext } from "react";
export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [aToken, setToken] = React.useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  // console.log("Backend URL:", backendUrl);
  const value = {
    aToken,
    setToken,
    backendUrl,
  };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
export default AdminContextProvider;
