import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, default:"/public/images/defaultImage.png" },   
    address: { type: Object, default: {line1:"", line2:""} },
    gender:{ type: String, default: "Not Specified" },
    dob:{ type: String, default: "Not Selected" },
    phone:{ type: String, default: "00000000" },
  }
);

export default mongoose.model("user", userSchema);
