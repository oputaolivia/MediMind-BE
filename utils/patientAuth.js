const { Patient } = require("../models/patientModel");
const jwt = require('jsonwebtoken');

const secretKey = process.env.PATIENT_SECRET;

const patientLogin = async (req, res) =>{
    const {firstName, lastName, medicalID} = req.body;

    Patient.findOne({
        medicalID: medicalID,
    }), async(err, patient) =>{
        if (err){
            res.status(500).send({
                data: {},
                message: err,
                status: 1,
            });
        }else if (!patient){
            res.status(401).send({
                data:{},
                message: `Patient with medical ID ${medicalID} doesn't exist`,
                status: 1,
            });
        }else{
            const token = jwt.sign({
                id : patient._id,
            }, secretKey,{
                expiresIn: "1h",
            });

            res.status(200).send({
                data: {
                    id: patient._id,
                    medicalID: org.medicalID,
                },
                message:" Patient Logged in",
                status: 0,
            })
        };

    }
};

const patientAuth = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token)
      return res
        .status(401)
        .json({ msg: "No authenication token, authorization denied" });
  
    const verfied = jwt.verify(token, secretKey);
    if (!verfied)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied" });
  
    req.patient = verfied.id;
    next();
};

module.exports ={
    patientLogin,
    patientAuth,
}