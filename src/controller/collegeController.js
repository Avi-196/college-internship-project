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
      
 if(!(/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i.test(data.logoLink))){
            return res.status(400).send({status:false,msg:"logolink is invalid"})
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
        return res.status(404).send({ data: result })
      }
  
    } catch (err) {
      return res.status(500).send({ msg: err.message })
    }
  
  }




module.exports.collegeCreated=collegeCreated
module.exports.collegeDetails=collegeDetails