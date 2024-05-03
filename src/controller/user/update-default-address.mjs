import { updateMakeDefaultUserAddress } from "../../data/users/update.mjs"


export const user_updateDefaultAddressGet = async (req,res)=>{
    const addressId = req.query.addressId
    console.log(addressId,'addrs id is showing');
    await updateMakeDefaultUserAddress(addressId)
    res.json({result:'success'})
}