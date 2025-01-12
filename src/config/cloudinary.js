import {v2 as cloudinary} from "cloudinary"

const cloudinaryimage = async ()=>{

    cloudinary.config({
        cloud_name : "dpvtlvxmg",
        api_key : "626418512299347",
        api_secret :"lI3vrNLNV47WRPnxYdZ1QdErj5I"
    })
}

export default cloudinaryimage;