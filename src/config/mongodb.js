import mongoose from "mongoose";

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://mehraroshan1802:sxZEk2mTrpI03sb0@cluster0.3qiqz.mongodb.net/prescripto");
      
}

export default connectDB;