const internModel=require('../models/internModel')



const createIntern=async function(req,res){

    try{
        const data=req.body
        if(!data.name){
            res.status(400).send({status:false,msg:"name is required"})
            return
        }
        if(!data.email){
            res.status(400).send({status:false,msg:"email is required"})
            return
        }
        if(!data.mobile){
            res.status(400).send({status:false,msg:"mobile number is required "})
            return
        }
        if(!data.collegeId){
            res.status(400).send({status:false,msg:"collegeId is required"})
            return
        }
        // let uniqueName=await internModel.findOne({name:data.name})
        // if(uniqueName){
        //    return res.status(406).send({status:false,msg:"name is already taken same name not acceptable"})
        // }
        let uniqueEmail=await internModel.findOne({email:data.email})
          if(uniqueEmail){
            return  res.status(406).send({status:false,msg:"this email is already taken not acceptable"})
          }

          let uniqueMobile=await internModel.findOne({mobile:data.mobile})
          if(uniqueMobile){
            return  res.status(406).send({status:false,msg:"this mobile is already taken not acceptable"})
          }

          let internCreate=await internModel.create(data)
         return res.status(201).send({status:true,data:internCreate})


    }
    catch (error) {
        
     return  res.status(500).send({ status: false, msg: error.message })
    }
}


module.exports.createIntern=createIntern