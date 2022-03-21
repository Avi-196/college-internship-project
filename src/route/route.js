const express=require('express');
const router=express.Router();
const collegeController = require("../controller/collegeController.js")
const internController = require("../controller/internController.js")



router.post('/collegeCreated',collegeController.collegeCreated)








module.exports=router