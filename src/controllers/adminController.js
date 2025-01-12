import upload from "../middlewares/multer.js";
import doctormodel from "../models/doctorsSchema.js";
import validation from "../utils/validation.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";

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

    console.log("Request body:", req.body);
    console.log("Uploaded image:", imagefile);

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
      Address,
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
    res.status(400).send("ERR: " + err);
  }
};

const alldoctors = async (req, res)=>{
  try{

    const doctordata = await doctormodel.find({}).select("-password")

    console.log(doctordata);

    if(doctordata){
    res.json({ success: true, message: doctordata })
    }else{
      res.json({success: false, message: "Doctors are not available"})
    }

  }catch(err){
    res.status(400).send("ERR: " + err);
  }
}

export { addDoctor, adminlogin, alldoctors };
