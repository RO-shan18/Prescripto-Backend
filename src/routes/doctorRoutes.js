import express from "express";
import { doctorlists } from "../controllers/doctorController.js";

const doctorRouter = express.Router();

doctorRouter.get("/doctorlist", doctorlists);

export default doctorRouter;