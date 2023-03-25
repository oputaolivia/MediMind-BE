const {Org} = require("../models/orgModel.js");
const nodemailer = require('nodemailer');

const getOrg = async (req, res) =>{
    try{
        let {id} = req.params;
        const org = await Org.findById(id);

        res.status(200).send({
            data:{
                id: org._id,
                email: org.email,
                orgName: org.orgName,
                phoneNumber: org.phoneNumber,
                isVerified: org.isVerified, 
            },
            message: "Found Organization Details",
            status: 0,
        })
    } catch (err) {
        res.status(500).send({
            data: {},
            error: err.message,
            status:1,
        })
    }
};

const getOrgs = async (req, res) => {
    try {
      const orgs = await Org.find({});
      res.status(200).send({
        data: orgs,
        message: "All Organizations",
        status: 0,
      });
    } catch (err) {
      res.status(500).send({
        data: {},
        error: err.message,
        status: 1
    });
    }
};

const updateOrg = async (req, res) => {
    try {
      const { id } = req.params;
      const orgId = req.org;
  
      if (id !== orgId)
        return res
          .status(401)
          .send({
            data: {},
            message: "Unauthorized!",
            status: 1
        });
  
      const org = await Org.findOne({
        _id: id,
      });
  
      const updatedOrg = await Org.findByIdAndUpdate(id, req.body);
  
      res
        .status(201)
        .send({
            data: updatedOrg,
            message: "Organization Updated",
            status: 0,
        });
    } catch (err) {
      res.status(500).send({ 
        data: {},
        error: `${err.message}`,
        status: 1
    });
    }
};

const deleteOrg = async (req, res) => {
    try {
      const { id } = req.params;
      const orgId = req.org;
  
      if (id !== orgId)
        return res
          .status(401)
          .send({ data: {}, message: "Unauthorized!", status: 1 });
  
      const org = await Org.findOne({
        _id: id,
      });
      if (!org)
        return res.status(401).send({
          data: {},
          message: "Organization does not exist!",
          status: 1,
        });
  
      const deletedOrg = await Org.findByIdAndRemove(id);
      res.status(201).send({
        message: "Organization Profile Deleted",
        status: 0,
    });
    } catch (err) {
      res.status(500).send({
        data: {},
        error: `${err.message}`,
        status: 1,
    });
    }
  };

module.exports = {
    getOrg,
    getOrgs,
    deleteOrg,
    updateOrg,
}