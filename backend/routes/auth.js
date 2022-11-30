const express=require("express")
const router=express.Router()
const User=require("../models/User")

const fetchuser=require('../Middleware/fetchuser')

const { body, validationResult } = require('express-validator');

const bcrypt=require("bcryptjs")

const JWT_Secret="mfemf@@$2kr"
const jwt = require('jsonwebtoken');



router.post('/cred',[
    body('name',"Enter a valid name").isLength({min:3}),
    body('email',"Enter a valid email").isEmail(),
    body('password',"Enter a valid password").isLength({min:5})

], async (req,res)=>{
  let success=false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    

    let user=await User.findOne({email:req.body.email})
    if(user){
      return res.status(400).json({error:'Sorry a user with this email is already exist'})
    }

    const salt= await bcrypt.genSalt(10)
    const secPass=await  bcrypt.hash(req.body.password,salt)
    
    user =await User.create({
      name: req.body.name,
      password: secPass,
      email:req.body.email
    }); 
    
    const data={
      user:{
        id:user.id
      }
    }
    const token=jwt.sign(data,JWT_Secret)
    success=true
    res.json({success,"token":token})

  })

// 2nd route 

  router.post('/login',[
   
    body('email',"Enter a valid email").isEmail(),
    body('password',"Enter a  password").exists()
  
  ], async (req,res)=>{
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
  const{email,password}=req.body

  
  try{
    let user= await User.findOne({email});
    if(!user){
      return res.status(404).json({error:"Please try with correct credentials"})
    }
  
    let comppassword= await bcrypt.compare(password,user.password)
    if(!comppassword){
      return res.status(404).json({error:"Please try with correct credentials"})
  
    }
  
    const data={
      user:{
        id:user.id
      }
    }
    const token=jwt.sign(data,JWT_Secret)
    success=true
  
    res.json({success,"token":token})
  
  
  
  }
  catch(error){
    res.status(404).send("Internal server error")
  
  }  

})

// 3rd route 

router.post('/getinfo',fetchuser,async (req,res)=>{
  try {
    id=req.user.id
    const user =await User.findById(id).select("-password")
    res.send(user)

    
  } catch (error) {
    console.log(error)
    res.status(500).send("internal server error")
    
  }

})

module.exports=router


