const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');


const app = express();
dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

const { orgRoute } = require('./routes/orgRoute');
const { patientRoute } = require('./routes/patientRoute');
const { staffRoute } = require('./routes/staffRoute');


app.use("/api/org", orgRoute);
app.use("/api/patient", patientRoute);
app.use("/api/staff", staffRoute)

app.listen(PORT, ()=>{
    console.log (`MediMind running on port ${PORT}`)
})