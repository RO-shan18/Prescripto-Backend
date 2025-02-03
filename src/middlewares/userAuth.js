import jwt from "jsonwebtoken"

const userAuth = async(req, res, next)=>{
    try{
        const Usertoken = req.cookies;
        
        if(!Usertoken){
            return res.status(400).send("Token expired!!!");
        }
    
        const {token} = Usertoken;
    
        const validuser = await jwt.verify(token, "user@123");
    
        const {userid} = validuser;
    
        req.body.userid = userid;

        next();
        
        }catch(err){
            return res.status(400).send("ERR: " + err);
        }
}

export default userAuth;