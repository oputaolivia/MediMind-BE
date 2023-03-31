const { Org } = require("../models/orgModel");
const { Staff } = require("../models/staffModel");

const createStaff = async (req, res) =>{
    try{
      const orgId = req.org;
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            medicalRole
        } = req.body;

        if(
            !firstName ||
            !lastName ||
            !email ||
            !phoneNumber ||
            !medicalRole
        )
        return res.status(400).send({
            data: {},
            message: "Not all fields have been entered",
            status: 1,
        });
        const staff = new Staff({
            org: req.org,
            firstName,
            lastName,
            email,
            phoneNumber,
            medicalRole
        })

        const createdStaff = await staff.save();
        res.status(201).send({
            data: createdStaff,
            message: "Staff Created!",
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

const updateStaff = async (req, res) => {
    try {
      const { id } = req.params;
      const orgId = req.org;
  
      const staff = await Staff.findOne({
        _id: id,
      });

      const org = await Org.findOne({
        _id: orgId,
      })
  
      if (!staff)
        return res.status(401).send({
          data: {},
          message: "Staff doesn't exist",
          status: 1,
        });
  
      if (!org)
        return res
          .status(401)
          .send({
            data: {},
            message: "Unauthorized to edit Staff",
            status: 1
          });
  
      const updatedStaff = await Staff.findByIdAndUpdate(id, req.body);
  
      return res
        .status(201)
        .send({ 
            data: updatedStaff, 
            message: "Staff Updated", 
            status: 0,
          });
    } catch (err) {
      res.status(500).send({ 
        data: {}, 
        error: `${err.message}`,
        status: 1 });
    };
}

const getStaffs = async (req, res) =>{
  try{
    const staffs = await Staff.find({});
    res.status(200).send({
      data: staffs,
      message: "All Staffs",
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

const getStaff = async (req, res) =>{
  try{
    let {id} = req.params;
    const staff = await Staff.findById(id);

    if(!staff)
      return res.status(401).send({
        data: {},
        message: "Staff doesn't exist",
        status:1,
      });

      res.status(200).send({
        data: staff,
        message: "Found Staff Details",
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

const deleteStaff = async (req, res) =>{
  try{
    const {id} = req.params;
    const user = req.user;

    const staff = await Staff.findOne({
      _id: id,
    });

    if (!staff)
      return res.status(401).send({
        data: {},
        message: "Staff doesn't exist",
        status: 1,
      });

    if (user !== staff.user.valueOf())
      return res.status(401).send({
        data: {},
        message: "Unauthorized to delete staff",
        status: 1,
      })

      const deletedStaff = await Staff.findByIdAndRemove(id);
      res.status(201).send({ 
        data: deletedStaff,
        message: "Staff Deleted", 
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
    getStaff,
    getStaffs,
    createStaff,
    updateStaff,
    deleteStaff,
}