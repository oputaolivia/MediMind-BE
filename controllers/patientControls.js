const { Patient } = require("../models/patientModel");
const { Org } = require("../models/orgModel");

const createPatient = async (req, res) =>{
    try{
      const orgId = req.org;
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            gender,
            address,
            DOB,
            genoType,
            bloodGroup
        } = req.body;

        if(
            !firstName ||
            !lastName ||
            !email ||
            !phoneNumber ||
            !gender ||
            !address ||
            !DOB
        )
        return res.status(400).send({
            data: {},
            message: "Not all fields have been entered",
            status: 1,
        });

        // generating medical ID
        const org = await Org.findOne({
          _id: orgId,
        })
        const orgName = org.orgName;
        const halfNumber = Math.floor(phoneNumber.toString().length / 2);
        const newNum = phoneNumber.toString().slice(halfNumber);
        const newStr = orgName.substring(0,3);
        const medicalid = newNum + newStr.toUpperCase();
        // const medicalid = phoneNumber.slice(1);
        console.log(medicalid)
        const patient = new Patient({
            org: req.org,
            firstName,
            lastName,
            email,
            phoneNumber,
            gender,
            medicalID: medicalid,
            address,
            DOB,
            genoType,
            bloodGroup
        })

        const createdPatient = await patient.save();
        res.status(201).send({
            data: createdPatient,
            message: "Patient Created!",
            status:0,
        });
    }catch (err){
        res.status(500).send({
            data: {},
            error: message.err,
            status: 1,
        })
    }
};

const updatePatient = async (req, res) => {
    try {
      const { id } = req.params;
      const orgId = req.org;
  
      const patient = await Patient.findOne({
        _id: id,
      });

      const org = await Org.findOne({
        _id: orgId,
      })
  
      if (!patient)
        return res.status(401).send({
          data: {},
          message: "Patient doesn't exist",
          status: 1,
        });
  
      if (!org)
        return res
          .status(401)
          .send({
            data: {},
            message: "Unauthorized to edit patient",
            status: 1
          });
  
      const updatedPatient = await Patient.findByIdAndUpdate(id, req.body);
  
      return res
        .status(201)
        .send({ 
            data: updatedPatient, 
            message: "Patient Updated", 
            status: 0,
          });
          console.log(`patient.org.valueOf(): ${patient.org.valueOf()}`)
          console.log(`org: ${org}`)
    } catch (err) {
      res.status(500).send({ 
        data: {}, 
        error: `${err.message}`,
        status: 1 });
    };
}

const getPatients = async (req, res) =>{
  try{
    const patients = await Patient.find({});
    res.status(200).send({
      data: patients,
      message: "All Patients",
      status: 0,
    })
  } catch (err){
    res.status(500).send({
      data:{},
      error: err.message,
      status: 1,
    })
  }
};

const getPatient = async (req, res) =>{
  try{
    let {id} = req.params;
    const patient = await Patient.findById(id);

    if(!patient)
      return res.status(401).send({
        data: {},
        message: "Patient doesn't exist",
        status:1,
      });

      res.status(200).send({
        data: patient,
        message: "Found Patient Details",
        status: 0,
      });
  }catch (err){
    res.status(500).send({
      data: {},
      error: err.message,
      status:1,
    })
  }
};

const deletePatient = async (req, res) =>{
  try{
    const {id} = req.params;
    const user = req.user;

    const patient = await Patient.findOne({
      _id: id,
    });

    if (!patient)
      return res.status(401).send({
        data: {},
        message: "Patient doesn't exist",
        status: 1,
      });

    if (user !== patient.user.valueOf())
      return res.status(401).send({
        data: {},
        message: "Unauthorized to delete patient",
        status: 1,
      })

      const deletedPatient = await Patient.findByIdAndRemove(id);
      res.status(201).send({ 
        data: deletedPatient,
        message: "Patient Deleted", 
        status: 0
      });
  }catch (err){
    res.status(500).send({
      data: {},
      error: err.message,
      status:1,
    })
  }
}

module.exports = {
  getPatient,
  getPatients,
  createPatient,
  updatePatient,
  deletePatient,
}