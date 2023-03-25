const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    org: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Org",
      },
    firstName:{
        type: String,
    },
    lastName:{
        type: String,
    },
    email:{
        type: mongoose.Schema.Types.Mixed,
    },
    phoneNumber: {
        type: String,
    },
    gender:{
        type: String,
    },
    address: {
        type: String,
    },
    medicalID:{
        type: String,
    },
    DOB: {
        type: Date,
    },
    genoType: {
        type: String,
    },
    bloodGroup: {
        type: String,
    },
},{
    timestamps: true,
});

const Patient = mongoose.model("patient", patientSchema);
module.exports = {
    Patient,
}