const mongoose = require("mongoose");

const orgSchema = new mongoose.Schema({
  orgName: {
    type: String,
  },
  email: {
    type: mongoose.Schema.Types.Mixed,
  },
  phoneNumber: {
    type: String,
  },
  location: {
    type: String,
  },
  password: {
    type: mongoose.Schema.Types.Mixed,
  },
  otp: { 
    type: Number,
    default: 0,
  },
  isVerified: { 
    type: Boolean,
    default: false
  },
},  {
  timestamps: true,
});

const Org = mongoose.model("org", orgSchema);

module.exports = {
  Org,
};
