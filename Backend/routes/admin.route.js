import express from 'express'
import {addDoctor,adminLogin} from '../controllers/admin.controller.js'
import upload from '../middleware/multer.middleware.js'
import authAdmin from '../middleware/authAdmin.middleware.js'
const router = express.Router()

router.post('/add-doctor',authAdmin, upload.single('image'), addDoctor)
router.post('/login',adminLogin)

export default router