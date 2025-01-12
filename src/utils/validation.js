import validator from "validator";

const validation = (req)=>{

        const {name , email, password, speciality, degree, experience, about, fees, Address } = req.body;

        console.log(name , email, password, speciality, degree, experience, about, fees, Address )

    //Checks an empty field
    if(!email || !name || !password || !speciality || !degree || !experience || !about || !fees || !Address){
        return res.json({success : "false", message : "Field is Empty"})
    }

    console.log("valid")

    //Validate an email
    if(!validator.isEmail(email)){
        return res.json({success : "false", message : "Email is not valid"})
    }

    console.log("valid")
    //validate an password
    if(!validator.isStrongPassword(password)){
        return res.json({success : "false", message : "Password should contains atleast 8 characters, Capital letters and numbers"})
    }
    console.log("valid")
}

export default validation