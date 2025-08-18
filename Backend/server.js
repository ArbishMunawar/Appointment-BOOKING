import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import setupRoutes from './routes/routes.js';


//app config
const app = express();
const port = process.env.PORT || 5000;
connectDB()
connectCloudinary()


//middlewares
app.use(cors());
app.use(express.json());

//api endpoints
setupRoutes(app);
app.get('/', (req, res) => res.status(200).send('Hello ARBISH!'));


app.listen(port, () => console.log(`Server running  on port: ${port}`));