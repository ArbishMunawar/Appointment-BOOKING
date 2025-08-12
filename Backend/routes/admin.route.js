import express from "express";
import {
  addDoctor,
  adminLogin,
  allDoctors,
} from "../controllers/admin.controller.js";
import upload from "../middleware/multer.middleware.js";
import authAdmin from "../middleware/authAdmin.middleware.js";
import { changeAvailable } from "../controllers/doctor.controller.js";
const router = express.Router();

router.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
router.post("/login", adminLogin);
router.post("/all-doctors", authAdmin, allDoctors);
router.post("/change-availability", authAdmin, changeAvailable);

export default router;
