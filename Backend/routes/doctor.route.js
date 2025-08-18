
import express from 'express'
import {doctorList, doctorLogin, appointmentsDoctor, appointmentComplete, appointmentCancel,doctorDashboard, updateDoctorProfile , doctorProfile} from '../controllers/doctor.controller.js'
import doctorAuth from '../middleware/authDoctor.js'

const router=express.Router()

router.get('/list',doctorList)
router.post('/login',doctorLogin)
router.get('/appointments',doctorAuth,appointmentsDoctor)
router.post('/complete-appointment',doctorAuth,appointmentComplete)
router.post('/cancel-appointment',doctorAuth,appointmentCancel)
router.get('/dashboard',doctorAuth,doctorDashboard)
router.get('/profile',doctorAuth,doctorProfile)
router.post('/update-profile',doctorAuth,updateDoctorProfile)

export default router