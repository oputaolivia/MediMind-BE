const jwt = require('jsonwebtoken');
const { Staff} = require('../models/staffModel');
require('dotenv').config();

const secretKey = process.env.STAFF_SECRET;

const staffLogin = async (req, res) =>{
    const {firstName, lastName,email} = req.body;

    const staff = await Staff.findOne({
        email:email
    })
    if (!staff){
            res.status(401).send({
                data:{},
                message: `Staff with email: ${email} doesn't exist`,
                status: 1,
            });
        }else{
            const token = jwt.sign({
                id : staff._id,
            }, secretKey,{
                expiresIn: "1h",
            });

            res.status(200).send({
                data: {
                    token,
                    id: staff._id,
                    email:email,
                },
                message:"Staff Logged in",
                status: 0,
            })
        };

    }

const staffAuth = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token)
      return res
        .status(401)
        .json({ msg: "No authenication token, authorization denied" });
  
    const verfied = jwt.verify(token, process.env.SECRET);
    if (!verfied)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied" });
  
    req.staff = verfied.id;
    next();
  };
module.exports = {
    staffLogin,
    staffAuth,
}