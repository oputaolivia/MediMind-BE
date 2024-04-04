// const { Patient } = require("../models/patientModel");
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const secretKey = process.env.PATIENT_SECRET;

// const patientLogin = async (req, res) =>{
//     const {firstName, lastName, medicalID} = req.body;

//     const patient = await Patient.findOne({
//         medicalID: medicalID
//     })
//     if (!patient){
//             res.status(401).send({
//                 data:{},
//                 message: `Patient with medical ID ${medicalID} doesn't exist`,
//                 status: 1,
//             });
//         }else{
//             const token = jwt.sign({
//                 id : patient._id,
//             }, secretKey,{
//                 expiresIn: "1h",
//             });

//             res.status(200).send({
//                 data: {
//                     token,
//                     id: patient._id,
//                     medicalID: medicalID,
//                 },
//                 message:" Patient Logged in",
//                 status: 0,
//             })
//         };

// };


// const patientAuth = (req, res, next) => {
//     const token = req.header("x-auth-token");
//     if (!token)
//       return res
//         .status(401)
//         .json({ msg: "No authenication token, authorization denied" });
  
//     const verfied = jwt.verify(token, secretKey);
//     if (!verfied)
//       return res
//         .status(401)
//         .json({ msg: "Token verification failed, authorization denied" });
  
//     req.patient = verfied.id;
//     next();
// };

// module.exports ={
//     patientLogin,
//     patientAuth,
// }