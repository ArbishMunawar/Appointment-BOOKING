
import express from 'express'
import {doctorList} from '../controllers/doctor.controller.js'
const router=express.Router()

router.get('/list',doctorList)

export default router