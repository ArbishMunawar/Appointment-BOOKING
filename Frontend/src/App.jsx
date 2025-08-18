import React from 'react'
import Navbar from './components/common/Navbar'
import { Outlet } from "react-router";
import Footer from './components/common/Footer';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  console.log('testing frontend ')
  return (
    <div className='mx-4 sm:mx-[10%]'>

      <ToastContainer/>
      <Navbar/>
      <Outlet />
      <Footer/>
    </div>
  )
}

export default App