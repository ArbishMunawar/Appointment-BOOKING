import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctor.model.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointment.model.js";
import userModel from "../models/user.model.js";

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      address,
      degree,
      about,
      experience,
      fees,
    } = req.body;
    const imageFile = req.file;

    //checking for all data to add doctor
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !address ||
      !degree ||
      !experience ||
      !about ||
      !fees
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // validationg email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // validate the password strength
    if (password.length < 8) {
      return res.status(400).json({ error: "Enter a strong password" });
    }

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //upload image to cloudinary or local storage
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    //creating doctor object
    const doctorData = {
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res
      .status(201)
      .json({ message: "Doctor added successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add doctor", success: false });
  }
};

//API dor admin login

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required", success: true });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ error: "Invalid email format", success: false });
    }

    // Check if the admin credentials match
    if (
      email == process.env.ADMIN_EMAIL &&
      password == process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);

      return res
        .status(200)
        .json({ message: "Admin login successful", success: true, token });
    } else {
      return res
        .status(401)
        .json({ error: "Invalid email or password", success: false });
    }
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// //api to get all doctors list

const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ message: error.message, success: "false" });
  }
};

//API to get all appointments

const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({ success: true, appointments });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ message: error.message, success: "false" });
  }
};

//API for appointment cacellation
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    // const userId = req.user.id; // keep it consistent with everywhere else

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // release doctor slot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);

    if (doctorData.slots_booked && doctorData.slots_booked[slotDate]) {
      doctorData.slots_booked[slotDate] = doctorData.slots_booked[
        slotDate
      ].filter((e) => e !== slotTime);
      await doctorModel.findByIdAndUpdate(docId, {
        slots_booked: doctorData.slots_booked,
      });
    }

    res.json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    console.error("Cancel Appointment Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//API to get dashboarddata for admin panel

const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      letestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, success: "false" });
  }
};

export {
  addDoctor,
  adminLogin,
  allDoctors,
  appointmentsAdmin,
  appointmentCancel,
  adminDashboard,
};
