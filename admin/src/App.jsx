import React, { useContext } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";
import DashBoard from "./pages/Admin/DashBoard";
import AllAppointments from "./pages/Admin/AllAppointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";
import { DoctorContext } from "./context/DoctorContext";
import DoctorDahboard from "./pages/Doctor/DoctorDahboard";
import DoctorAppointment from "./pages/Doctor/DoctorAppointment";
import DoctorProfile from "./pages/Doctor/DoctorProfile";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return aToken || dToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />

        <Routes>
          {/* Admin route  */}
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<DashBoard />} />
          <Route path="/all-appointments" element={<AllAppointments />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctor-list" element={<DoctorsList />} />

          {/* Doctor route  */}

          <Route path="/doctor-dashboard" element={<DoctorDahboard />} />
          <Route path="/doctor-appointments" element={<DoctorAppointment />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />

        </Routes>
      </div>
    </div>
  ) : (
    <>
      <LoginPage />
      <ToastContainer />
    </>
  );
};

export default App;
