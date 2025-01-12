import express from "express";
import { addDoctor, adminlogin, alldoctors } from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authentication from "../middlewares/Auth.js";
import { CheckAvailability } from "../controllers/doctorController.js";

const adminRouter = express.Router();

//adding doctor by admin
adminRouter.post("/add-doctor",authentication,upload.single("image"), addDoctor);
adminRouter.post("/login",adminlogin);
adminRouter.get("/all-doctor",authentication, alldoctors);
adminRouter.post("/check-availability", authentication, CheckAvailability);

export default adminRouter;