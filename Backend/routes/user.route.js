import express from "express";
import { registerUser,loginUser, getProfileData, updateProfile ,bookAppointment, listAppointment, cancelAppointment} from "../controllers/user.controller.js";
import userAuth from "../middleware/authUser.middleware.js";
import upload from "../middleware/multer.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/get-profile", userAuth,getProfileData);
router.post("/update-profile",upload.single('image'), userAuth,updateProfile);
router.post("/book-appointment", userAuth,bookAppointment);
router.get("/appointments", userAuth,listAppointment);
router.post("/cancel-appointment", userAuth,cancelAppointment);

export default router;
