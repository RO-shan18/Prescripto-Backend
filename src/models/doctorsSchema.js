import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    //initially showing undefined because of space inside the postman
    speciality: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      default: "About doctor",
    },
    fees: {
      type: String,
      required: true,
    },
    Address: {
      type: Object,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    date: {
      type: String,
      required: true,
    },
    SlotsBooked: {
      type: Object,
      default: {},
    },
  },
  { minimize: false },
  { timestamps : true }
);


const doctormodel = mongoose.models.Doctors || mongoose.model("Doctors", doctorSchema);

export default doctormodel;
