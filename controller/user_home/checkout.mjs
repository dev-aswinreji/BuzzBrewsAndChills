import { userAddressCollection } from "../../model/userAddress.mjs";

const user_address = async (req,res)=>{
    const data = {
        phonenumber: req.body.phonenumber,
        area: req.body.area,
        city: req.body.city,
    }

    
}