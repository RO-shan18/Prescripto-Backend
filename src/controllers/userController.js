//Register a new user

import jwt from "jsonwebtoken";
import userModels from "../models/userSchema.js";
import {userValidation}  from "../utils/validation.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";

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
            name : name,
            userid
        })

        //creating a user token and send it as a cookie
        const Usertoken = await jwt.sign({userid}, "user@123", {expiresIn : "7d"})
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

        if(!dcryptpassword){
            res.json({success : false, message : "Password is not valid"});
        }

        const userid = finduser._id
         //creating a user token and send it as a cookie
         const Usertoken = await jwt.sign({userid}, "user@123", {expiresIn : "7d"})
         res.cookie("token", Usertoken)
         
         res.json({success : true, message : "Logged in successfully", Usertoken});

    }catch(err){
        res.json({success : "false", message : err.message})
    }
}

const userProfile = async(req, res)=>{
    try{

        const {userid} = req.body;

        const data = await userModels.findById(userid).select("-password").exec();

        res.json({success:"true", message: data});

    }catch(err){
        res.json({success : "false", message : err.message})
    }
}

const updateProfile = async(req, res)=>{
    try{
        const {name, phoneno, Address, Gender, DOB, userid} = req.body;

        const imagefile = req.file;

        await userModels.findByIdAndUpdate(userid,{name, phoneno, Address: JSON.parse(Address), Gender, DOB});

        if(imagefile){
        const uploadimage = await cloudinary.uploader.upload(imagefile.path, {
            resource_type : "image",
        })

        const imageurl = uploadimage.secure_url;

        await userModels.findByIdAndUpdate(userid, {image : imageurl});
    }

        res.json({success: "true", message : "Profile Updated successfully"})

    }catch(err){
        res.json({success : "false", message : err.message})
    }
}

export {userRegister, userLogin, userProfile, updateProfile};