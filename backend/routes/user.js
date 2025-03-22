const User =require('../models/user')
const express=require('express')
const router=express.Router()

//Add New User to database
router.post('/',async(req,res)=>{
  try{
    console.log(req.body)
    const {fullName,dob,email,mobile}=req.body;
  
    const newUSer=await User.create({fullName,dob,email,mobile});
    
    res.status(201).json(newUSer)
  }
  catch(err){
    res.status(500).json({error:err.message})

  }
})


//To Get The All Users

router.get('/',async(req,res)=>{
   try{
    const getAllUsers=await User.findAll();
    res.status(200).json(getAllUsers)

   }catch(err){
    console.log("Error in Getting USers",err)
    res.status(500).json({error:err.message});
   }

})

module.exports = router