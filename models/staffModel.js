const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: mongoose.Schema.Types.Mixed,
  },
  phoneNumber: {
    type: String,
  },
  medicalRole:{
    type: String,
  },
},  {
  timestamps: true,
});

const Staff = mongoose.model("staff", staffSchema);

module.exports = {
 Staff,
};
