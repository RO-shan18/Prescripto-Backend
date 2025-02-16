import express from "express";
import cors from "cors";
import "dotenv";
import connectDB from "./src/config/mongodb.js";
import cloudinaryimage from "./src/config/cloudinary.js";
import adminRouter from "./src/routes/adminRoutes.js";
import cookie from "cookie-parser";
import doctorRouter from "./src/routes/doctorRoutes.js";
import userRouter from "./src/routes/userRoutes.js";

//config server
const app = express();
const port = process.env.port || 3000;

//middlewares
app.use(express.json());

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"], // Frontend URL
  credentials:true, // Allow credentials (cookies)
}));


app.use(cookie());

//api
app.get("/", (req, res) => {
  res.send("Server connected!!!!");
});

//Admin Router
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);

//user Router
app.use("/api/user", userRouter);

//connection
cloudinaryimage()
  .then(() => console.log("Cloudinary connected"))
  .catch(() => console.log("Not connected"));

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(port, () => {
      console.log("Server listen to the port no.", port);
    });
  })
  .catch(() => {
    console.log("Database not connected");
  });
