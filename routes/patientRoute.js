const express = require('express');
const { getPatient, getPatients, createPatient, updatePatient, deletePatient } = require('../controllers/patientControls');
const { auth } = require('../utils/orgAuth');
const { patientAuth, patientLogin } = require('../utils/patientAuth');

const patientRoute = express.Router();

patientRoute.post("/login", patientAuth, patientLogin);
patientRoute.post("/createPatients", auth, createPatient);
patientRoute.get("/getPatients", getPatients);
patientRoute.get("/getPatient/:id", auth, getPatient);
patientRoute.put("/updatePatient/:id", auth, updatePatient);

module.exports = {
    patientRoute,
}
