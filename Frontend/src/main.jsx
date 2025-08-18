import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter,RouterProvider} from "react-router";
import Root from './App.jsx'
import HomePage from './pages/HomePage.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Doctors from './pages/Doctors.jsx'
import Login from './pages/Login.jsx'
import MyAppointments from './pages/MyAppointments.jsx'
import Appointment from './pages/Appointment.jsx'
import MyProfile from './pages/MyProfile.jsx'
import AppContextProvider from './context/AppContext.jsx' 
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, path:"/", element: <HomePage /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/doctors", element: <Doctors/>},
      { path: "/doctors/:speciality", element: <Doctors/>},
      { path: "/login", element: <Login /> },
      { path: "/my-appointments", element: <MyAppointments /> },
      { path: "/appointment/:id", element: <Appointment /> },
      { path: "/my-profile", element: <MyProfile /> },
   
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppContextProvider>
      {/* <Root /> */}
    <RouterProvider router={router} />
    </AppContextProvider>

  </StrictMode>,
)
