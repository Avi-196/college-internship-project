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
    
        let Email=await internModel.findOne({email:data.email})
          if(Email){
            return  res.status(406).send({status:false,msg:"this email is already taken not acceptable"})
          }

          let Mobile=await internModel.findOne({mobile:data.mobile})
          if(Mobile){
            return  res.status(406).send({status:false,msg:"this mobile is already taken not acceptable"})
          }
          let collegeId=await internModel.findOne({collegeId:data.collegeId})
              if(!collegeId){
                  return res.status(400).send({status:false,msg:"please provide right collegeId"})
              }
          

          let internCreate=await internModel.create(data)
         return res.status(201).send({status:true,data:internCreate})


    }
    catch (error) {
        
     return  res.status(500).send({ status: false, msg: error.message })
    }
}


module.exports.createIntern=createIntern