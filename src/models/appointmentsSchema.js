import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
    userData : {
        type:Object,
        required:true,
    },
    docData : {
        type:Object,
        required:true,
    },
    slotDate : {
        type:String,
        required:true,
    },
    slotTime : {
        type:String,
        required:true,
    },
    userId : {
        type:String,
        required:true,
    },
    docId:{
        type:String,
        required:true,
    },
    date:{
        type:Number,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    payment:{
        type:Boolean,
        default:false,
    },
    Cancelled:{
        type:Boolean,
        default:false,
    },
    isCompleted:{
        type:Boolean,
        default:false,
    }
})

const appointmentmodel = mongoose.models.Appointment || mongoose.model("Appointment", AppointmentSchema);

export default appointmentmodel;