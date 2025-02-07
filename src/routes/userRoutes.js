import express from "express";
import { slotsappointment, updateProfile, userLogin, userProfile, userRegister } from "../controllers/userController.js";
import userAuth from "../middlewares/userAuth.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/Login", userLogin);
userRouter.get("/getProfile",userAuth, userProfile)
userRouter.post("/updateProfile",upload.single("image") ,userAuth ,updateProfile);
userRouter.post("/Appointment", userAuth, slotsappointment);

export default userRouter;