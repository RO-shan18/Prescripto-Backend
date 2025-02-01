import validator from "validator";

export const validation = (req)=>{

        const {name , email, password, speciality, degree, experience, about, fees, Address } = req.body;

        console.log(name , email, password, speciality, degree, experience, about, fees, Address )

    //Checks an empty field
    if(!email || !name || !password || !speciality || !degree || !experience || !about || !fees || !Address){
        throw new Error("Field is empty")
    }

    //Validate an email
    if(!validator.isEmail(email)){
        throw new Error("Email is not valid")
    }

    //validate an password
    if(!validator.isStrongPassword(password)){
        throw new Error("Password should contains atleast 8 characters, Capital letters and numbers")
    }
}


export const userValidation = (req)=>{

    const {email, password, name} = req.body;

    if(!email || !password || !name){
        throw new Error("Field is empty")
    }

    if(!validator.isEmail(email)){
        throw new Error("Email is not valid");
    }

    if(!validator.isStrongPassword(password)){
       throw new Error("Password should contains atleast 8 characters, Capital letters and numbers")
    }
}
