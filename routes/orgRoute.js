const express = require('express');
const { getOrg, getOrgs, updateOrg, deleteOrg } = require('../controllers/orgControls');
const { register, login, auth, tokenIsValid } = require('../utils/orgAuth');

const orgRoute = express.Router();

orgRoute.post("/register", register);
orgRoute.post("/login", login);
orgRoute.post("/tokenIsValid", tokenIsValid);
orgRoute.get("/getOrg/:id", getOrg);
orgRoute.get("/getOrgs", getOrgs);
orgRoute.put("/updateOrg/:id", auth, updateOrg);
orgRoute.delete("/deleteOrg/:id", auth, deleteOrg);

module.exports = {
    orgRoute,
}