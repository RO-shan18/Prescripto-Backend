import doctormodel from "../models/doctorsSchema.js";

const CheckAvailability = async(req, res)=>{

    try{
        const {id} = req.body;

        const finddoctor = await doctormodel.findById(id)

        await doctormodel.findByIdAndUpdate(id, {$set : {available : !finddoctor.available}})     
    
        res.json({success : "true", message : "Availability change"})

    }catch(err){
        res.json({success : "false", message : err})
    }
    
}

export {CheckAvailability};