const collegeModel = require("../models/collegeModel")

// const isValid = function (value) {
//     if (typeof value === 'undefined' || value === null) return false
//     if (typeof value === 'string' && value.trim().length === 0) return false
//     if (typeof value === 'number') return false
//     return true;
// }


const collegeCreated = async function (req, res) {
    try {

        

        const requestBody = req.body;
       
        if (!requestBody.name) {
            res.status(400).send({ status: false, message: 'college name is required' })
            return
        }
        if (!requestBody.fullName) {
            res.status(400).send({ status: false, message: 'college full name is required' })
            return
        }
        if (!requestBody.logoLink) {
            res.status(400).send({ status: false, message: 'logo link is required' })
            return
        }

        let uniqueNameCheck = await collegeModel.findOne({name:requestBody.name})
        if(uniqueNameCheck){
        return res.status(400).send({status:false,msg:"this name already exist"})
        }

        let uniqueFullNameCheck = await collegeModel.findOne({fullName:requestBody.fullName})
        if(uniqueFullNameCheck){
        return res.status(400).send({status:false,msg:"this full  name already exist"})
        }

        let collegeCreate = await collegeModel.create(requestBody)
        res.status(201).send({ status: true, data: collegeCreate })

    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: error.message })
    }

}


// let collegeCreated=async function(req,res){
//     try{

//         let data=req.body
//         let createCollege=await collegeModel.create(data)
//         res.status(201).send({msg:createCollege,status:true})
//     }
//     catch(err) {
//         res.status(500).send({msg:err.message})

//     }

// }

module.exports.collegeCreated=collegeCreated