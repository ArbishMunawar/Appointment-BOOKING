import React, { createContext } from "react";
import { useState } from "react";
export const DoctorContext = createContext();
import axios from "axios";
import { toast } from "react-toastify";

const DoctorContextProvider = ({ children }) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [dashData, setDashData]= useState(false)
  const [profileData, setProfileData]= useState(false)
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/appointments", {
        headers: { dToken },
      });
      if (data.success) {
        setAppointments(data.appointments);
        console.log(data.appointments)
        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeAppointment=async(appointmentId)=>{
  try {
      const { data } = await axios.post(backendUrl + "/api/doctor/complete-appointment",{appointmentId }, {
        headers: { dToken },
      });
      if (data.success) {
        getAppointments()
        // console.log(data.appointments)
        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  
  const cancelAppointment=async(appointmentId)=>{
  try {
      const { data } = await axios.post(backendUrl + "/api/doctor/cancel-appointment",{appointmentId }, {
        headers: { dToken },
      });
      if (data.success) {
        getAppointments()
        // console.log(data.appointments)
        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }


  const getDashData=async()=>{
  try {
      const { data } = await axios.get(backendUrl + "/api/doctor/dashboard", {
        headers: { dToken },
      });
      if (data.success) {
        setDashData(data.dashData)
        console.log(data.dashData)
        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }



  const getProfileData=async()=>{
  try {
      const { data } = await axios.get(backendUrl + "/api/doctor/profile", {
        headers: { dToken },
      });
      if (data.success) {
        setProfileData(data.profileData)
        console.log(data.profileData)
        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }



  const value = {
    dToken,
    setDToken,
    backendUrl,
    appointments,
    setAppointments,
    getAppointments,
    cancelAppointment,
    completeAppointment,
    dashData,setDashData,
    getDashData,
    profileData, 
    setProfileData,
    getProfileData
  };
  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};
export default DoctorContextProvider;
