const collegeModel = require("../models/collegeModel")

const internModel=require('../models/internModel')


const collegeCreated = async function (req, res) {
    try {

        

        const data = req.body;
       
        if (!data.name) {
            res.status(400).send({ status: false, message: 'name is required' })
            return
        }
        if (!data.fullName) {
            res.status(400).send({ status: false, message: 'full name is required' })
            return
        }
        if (!data.logoLink) {
            res.status(400).send({ status: false, message: 'logo link is required' })
            return
        }

        let Name = await collegeModel.findOne({name:data.name})
        if(Name){
        return res.status(400).send({status:false,msg:"name already exist"})
        }

        let FullName = await collegeModel.findOne({fullName:data.fullName})
        if(FullName){
        return res.status(400).send({status:false,msg:"full  name already exist"})
        }

        let collegeCreate = await collegeModel.create(data)
       return res.status(201).send({ status: true, data: collegeCreate })

    } 
    catch (error) {
       
       return res.status(500).send({ status: false, msg: error.message })
    }

}





const collegeDetails = async function (req, res) {
    try {
      let collegeName = req.query.collegeName
      if (!collegeName) { return res.status(400).send({ status: false, msg: "Please provide collegeName" }) }
      let collegeDetail = await collegeModel.findOne({ name: collegeName,isDeleted:false }).select({name:1,fullName:1, logoLink:1,})
      if (!collegeDetail) { return res.status(404).send({ status: false, msg: "no college found" }) }
  
      let internDetails = await internModel.find({ collegeId: collegeDetail._id,isDeleted:false }).select({
         _id:1, name:1,email:1,mobile:1
      })
      let result = { name: collegeDetail.name, fullName: collegeDetail.fullName, logoLink: collegeDetail.logoLink }
      if (internDetails.length > 0) {
        result["Interest"] = internDetails
  
        return res.status(200).send({ data: result })
      }
  
      if (internDetails.length == 0) {
        result["Interest"] = "no interns";
        return res.status(400).send({ data: result })
      }
  
  
    } catch (err) {
      return res.status(500).send({ msg: err.message })
    }
  
  }




module.exports.collegeCreated=collegeCreated
module.exports.collegeDetails=collegeDetails