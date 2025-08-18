import React, { createContext } from "react";
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const currency = "$";
  const calculateAge = (dob) => {
    if (!dob) return "-";
    const birthDate = new Date(dob);
    if (isNaN(birthDate)) return "-";

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    // Prevent negative age
    return age >= 0 ? age : "-";
  };

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");

    return (
      dateArray[0] + "" + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };
  const value = {
    calculateAge,
    slotDateFormat,
    currency
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export default AppContextProvider;
