//Register a new user

import jwt from "jsonwebtoken";
import userModels from "../models/userSchema.js";
import {userValidation}  from "../utils/validation.js";
import bcrypt from "bcrypt";

const userRegister = async(req, res) =>{

    try{
        //validate a user
        userValidation(req)

        const {email, password, name} = req.body;

        //hash a password
        const encryptpassword = await bcrypt.hash(password, 10);

        //creating an instance 
        const userData = new userModels({
            email : email,
            password : encryptpassword,
            name : name
        })

        //creating a user token and send it as a cookie
        const Usertoken = await jwt.sign({password}, "user@123", {expiresIn : "7d"})
        res.cookie("token", Usertoken)

        //save user data in database
        await userData.save();

        res.json({success : true, message : "Registered successfully!!", Usertoken})

    }catch(err){
        res.json({success : false, message : err.message})
    }
}

const userLogin = async(req, res)=>{
    try{

        //validate a user
        const {email, password} = req.body;

        const finduser = await userModels.findOne({email : email}).exec()

        if(!finduser){
            res.json({success : false, message : "User not found!!"})
        }

        //decrypting the password
        const dcryptpassword = await bcrypt.compare(password, finduser.password);

        console.log(dcryptpassword);

        if(!dcryptpassword){
            res.json({success : false, message : "Password is not valid"});
        }

         //creating a user token and send it as a cookie
         const Usertoken = await jwt.sign({password}, "user@123", {expiresIn : "7d"})
         res.cookie("token", Usertoken)
         
         res.json({success : true, message : "Logged in successfully", Usertoken});

    }catch(err){
        res.json({success : "false", message : err.message})
    }
}

export {userRegister, userLogin};