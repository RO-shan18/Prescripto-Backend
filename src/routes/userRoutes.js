import express from "express";
import { cancelappointment, getmyappointments, onlinepayment, slotsappointment, updateProfile, userLogin, userProfile, userRegister, verifypayment } from "../controllers/userController.js";
import userAuth from "../middlewares/userAuth.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/Login", userLogin);
userRouter.get("/getProfile",userAuth, userProfile)
userRouter.post("/updateProfile",upload.single("image") ,userAuth ,updateProfile);
userRouter.post("/Appointment", userAuth, slotsappointment);
userRouter.get("/getmyappointment", userAuth, getmyappointments);
userRouter.post("/cancelappointment", userAuth, cancelappointment);
userRouter.post("/onlinepayment", userAuth, onlinepayment);
userRouter.post("/verifyPayment", userAuth, verifypayment);

export default userRouter;