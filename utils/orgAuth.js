const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Org} = require('../models/orgModel');
require('dotenv').config();

const secretKey = process.env.SECRET;

const register = async(req, res) =>{
    let {orgName, email, phoneNumber, location, confPassword, password } = req.body;
    const salt = await bcrypt.genSalt();

    if (password !== confPassword){
        res.status(400).send({
            data: {},
            message: "Passwords don't match",
            status: 1,
        });
    }else{
        bcrypt.hash(password, salt, async(err, hash) =>{
            if (err){
                res.status(400).send({
                    data:{},
                    message: err,
                    status: 1,
                });
            }else{
                const existingOrg = await Org.findOne({
                    email: email
                });
                if (existingOrg)
                    return res.status(400).json({
                        data:{},
                        message: "Email already exist",
                        status: 1,
                    });
                const org = new Org({
                    orgName: req.body.orgName,
                    email: email,
                    location: req.body.location,
                    password: hash,
                });
                org.save()

                res.status(201).send({
                    data: org,
                    message: "Organization registered successfully",
                    status: 0,
                });
            }
        });
    }
};

const login = async (req, res) =>{
    const {email, password} = req.body;
    Org.findOne({email:email}, async(err, org) =>{
        if (err){
            res.status(500).send({
                data: {},
                message: err,
                status: 1,
            });
        }else if (!org){
            res.status(401).send({
                data: {},
                message: `Organization with ${email} not found!`,
                status: 1,
            });
        }else{
            bcrypt.compare(password, org.password, (err, result)=>{
                if (err) {
                    res.status(500).send({
                        data: {},
                        message: err,
                        status: 1,
                    })
                }else if (!result){
                    res.status(401).send({
                      data: {},
                      message: "Email or password is incorrect",
                      status: 1,
                    });
                }else{
                    const token = jwt.sign({
                        id : org._id
                    }, secretKey,{
                        expiresIn: "1h",
                    });
                    res.status(200).send({
                        data:{
                            token,
                            id: org._id,
                            orgName: org.orgName,
                            email: org.email,
                        },
                        message: "Organization logged in",
                        status:0,
                    });
                }
            });
        }
    });
};

const auth = (req, res, next) => {
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
  
    req.org = verfied.id;
    next();
  };

  const tokenIsValid = async (req, res) => {
    try {
      const token = req.header("x-auth-token");
      if (!token) return res.json(false);
  
      const verified = jwt.verify(token, process.env.SECRET);
      if (!verified) return res.json(false);
  
      const org = await Org.findById(verified.id);
      if (!org) return res.json(false);
  
      return res.json(true);
    } catch (err) {
      res.status(500).send({ data: {}, error: err.message, status: 1 });
    }
  };

  module.exports={
    register,
    login,
    auth,
    tokenIsValid,
}