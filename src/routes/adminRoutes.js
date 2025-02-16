import express from "express";
import { addDoctor, adminlogin, alldoctors, dashboarddata, getallAppointments } from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authentication from "../middlewares/Auth.js";
import { CheckAvailability } from "../controllers/doctorController.js";
import { cancelappointment } from "../controllers/adminController.js";

const adminRouter = express.Router();

//adding doctor by admin
adminRouter.post("/add-doctor",authentication,upload.single("image"), addDoctor);
adminRouter.post("/login",adminlogin);
adminRouter.get("/all-doctor",authentication, alldoctors);
adminRouter.post("/check-availability", authentication, CheckAvailability);
adminRouter.get("/getappointment", authentication, getallAppointments);
adminRouter.post("/cancelAppointment", authentication, cancelappointment)
adminRouter.get("/getdashboarddata", authentication, dashboarddata);

export default adminRouter;