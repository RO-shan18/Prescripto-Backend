import jwt from "jsonwebtoken";


const authentication = async (req, res, next)=>{
   
    try{
    const Admintoken = req.cookies;
    
    if(!Admintoken){
        return res.status(400).send("Token expired!!!");
    }

    const {token} = Admintoken

    const validuser = await jwt.verify(token, "admin@123");

    const {password} = validuser;

    if(password === 'qwerty123'){
        next();
    }
    
    }catch(err){
        return res.status(400).send("ERR: " + err);
    }
}

export default authentication