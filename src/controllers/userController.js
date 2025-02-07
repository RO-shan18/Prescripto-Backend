//Register a new user

import jwt from "jsonwebtoken";
import userModels from "../models/userSchema.js";
import {userValidation}  from "../utils/validation.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctormodel from "../models/doctorsSchema.js";
import appointmentmodel from "../models/appointmentsSchema.js";

const userRegister = async(req, res) =>{

    try{
        //validate a user
        userValidation(req)

        const {email, password, name} = req.body;

        const userid = "12345"

        //hash a password
        const encryptpassword = await bcrypt.hash(password, 10);

        //creating an instance 
        const userData = new userModels({
            email : email,
            password : encryptpassword,
            name : name,
        })

        //creating a user token and send it as a cookie
        const Usertoken = await jwt.sign({userid}, "user@123", {expiresIn : "1d"})
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

        res.json({success:true, message: data});

    }catch(err){
        res.json({success :false, message : err.message})
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

        res.json({success: true, message : "Profile Updated successfully"})

    }catch(err){
        res.json({success : false, message : err.message})
    }
}

const slotsappointment = async(req, res)=>{
    try{
        const {userid, doctorid, slotTime, slotdate} = req.body;

        const docData = await doctormodel.findById(doctorid).select("-password").exec();

        if(!docData.available){
           return res.json({success: false, message : "Doctor is not available"});
        }

        const slots_booked = docData.SlotsBooked;

        if(slots_booked[slotdate]){
            if(slots_booked[slotdate].includes(slotTime)){
               return res.json({success: false, message: "Slot is not available"});
            }else{
                slots_booked[slotdate].push(slotTime);
            }
        }else{
            slots_booked[slotdate] = [];
            slots_booked[slotdate].push(slotTime);
        }

        const userData = await userModels.findById(userid).select("-password");

        delete docData.slots_booked;

        const newappointment = {
            userId : userid,
            docId : doctorid,
            slotTime : slotTime,
            slotDate : slotdate,
            userData,
            docData,
            amount:docData.fees,
            date:Date.now(),
        }

        const appointment = await appointmentmodel(newappointment);
        await appointment.save();

        await doctormodel.findByIdAndUpdate(doctorid, {SlotsBooked : slots_booked});

        res.json({success:true, message:"Appointment Booked successfully"});

    }catch(err){
        res.json({success : false, message : err.message})
    }
}

export {userRegister, userLogin, userProfile, updateProfile, slotsappointment};