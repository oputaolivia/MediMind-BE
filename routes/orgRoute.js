// const express = require('express');
// const { getOrg, getOrgs, updateOrg, deleteOrg } = require('../controllers/orgControls');
// const { getPatient, createPatient,getPatients, updatePatient, deletePatient } = require('../controllers/patientControls');
// const { register, login, auth, tokenIsValid } = require('../utils/orgAuth');
// const {getStaff, getStaffs, createStaff, updateStaff, deleteStaff,} = require('../controllers/staffControls');

// const orgRoute = express.Router();

// //Org
// orgRoute.post("/register", register);
// orgRoute.post("/login", login);
// orgRoute.post("/tokenIsValid", tokenIsValid);
// orgRoute.get("/getOrg/:id", getOrg);
// orgRoute.get("/getOrgs", getOrgs);
// orgRoute.put("/updateOrg/:id", auth, updateOrg);
// orgRoute.delete("/deleteOrg/:id", auth, deleteOrg);

// //Patient
// orgRoute.post("/createPatients", auth, createPatient);
// orgRoute.get("/getPatients",auth, getPatients);
// orgRoute.get("/getPatient/:id", auth, getPatient);
// orgRoute.put("/updatePatient/:id", auth, updatePatient);

// //Staff
// orgRoute.post("/createStaff", auth, createStaff);
// orgRoute.get("/getStaffs",auth, getStaffs);
// orgRoute.get("/getStaff/:id", auth, getStaff);
// orgRoute.put("/updateStaff/:id", auth, updateStaff);

// module.exports = {
//     orgRoute,
// }