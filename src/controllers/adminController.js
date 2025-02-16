
import doctormodel from "../models/doctorsSchema.js";
import {validation} from "../utils/validation.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import appointmentmodel from "../models/appointmentsSchema.js";
import userModels from "../models/userSchema.js";

const addDoctor = async (req, res) => {
  try {
    //Validate
    validation(req);

    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      Address,
    } = req.body;
    const imagefile = req.file;

    //Encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);

    //upload image to cloudinary
    const uploadImage = await cloudinary.uploader.upload(imagefile.path, {
      resource_type: "image",
    });
    const imageURL = uploadImage.secure_url;

    const newdoctor = {
      name,
      email,
      password: encryptedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      Address : JSON.parse(Address),
      image: imageURL,
      date: Date.now(),
    };

    const adddoctor = new doctormodel(newdoctor);

    //save to the database
    await adddoctor.save();

    res.json({success:true});
  } catch (err) {
    res.status(400).json({success: false, message : err});
  }
};

const adminlogin = async (req, res) => {
  try {
    //verify emailid and password
    const { email, password } = req.body;

    if (email === "admin@prescripto.com" && password === "qwerty123") {
      const Admintoken = await jwt.sign({ password }, "admin@123");

      res.cookie("token", Admintoken)

      res.json({ success: true, message: "Login successful", Admintoken });
    } else {
      res.json({ success: false, message: "Wrong EmailId/Password !!!!" });
    }
  } catch (err) {
    res.status(400).json({success: false, message : err});
  }
};

const alldoctors = async (req, res)=>{
  try{

    const doctordata = await doctormodel.find({}).select("-password")

    if(doctordata){
    res.json({ success: true, message: doctordata })
    }else{
      res.json({success: false, message: "Doctors are not available"})
    }

  }catch(err){
    res.status(400).json({success: false, message : err});
  }
}

const getallAppointments = async (req, res)=>{
  try{
    const appointmentdata = await appointmentmodel.find({});

    res.json({success:true, message:appointmentdata});

  }catch{
    res.status(400).json({success: false, message : err});
  }
}

const cancelappointment = async(req, res)=>{
  try{
      const {appointmentid} = req.body;

      const appointmentdata = await appointmentmodel.findById({_id: appointmentid})

      await appointmentmodel.findByIdAndUpdate(appointmentid, {Cancelled:true});

      //slots removed from doctorslots
      const { docId, slotTime, slotDate} = appointmentdata;

      let doctordata = await doctormodel.findById({_id : docId})

      let slotsbooked = doctordata.SlotsBooked;

      slotsbooked[slotDate] = slotsbooked[slotDate].filter(e=> e != slotTime);

      await doctormodel.findByIdAndUpdate(docId, {SlotsBooked: slotsbooked});

      res.json({success:true, message:"Appointment cancelled"});

  }catch(err){
      res.json({success:false, message : err.message})
  }
}

const dashboarddata = async(req, res)=>{
  try{

    const userdata = await userModels.find({});
    const doctorsdata = await doctormodel.find({});
    const appointmentdata = await appointmentmodel.find({});

    const object = {
      users: userdata.length,
      doctors : doctorsdata.length,
      appointment : appointmentdata.length,
      recentappointment : appointmentdata.reverse().splice(0,5),
    }

    console.log(object)

    res.json({success: true, message:object})

  }catch(err){
    res.json({success:false, message : err.message})
  }
}

export { addDoctor, adminlogin, alldoctors, getallAppointments, cancelappointment, dashboarddata};
