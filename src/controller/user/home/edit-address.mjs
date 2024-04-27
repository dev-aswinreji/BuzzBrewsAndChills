import { findUserAddressUsingPopulate, findUserUsingIdAndPopulateAddress } from "../../../data/users/find.mjs"


export const user_editAddressGet = async (req,res)=>{
    const userId = req.query.id
    const user = await findUserUsingIdAndPopulateAddress(userId)
    console.log(user,'address is showing');
    // console.log(address.addresses);
    res.render('edit-address',{user})
}