import { findUserAddressUsingPopulate, findUserUsingIdAndPopulateAddress } from "../../../data/users/find.mjs"
import { updateUserAddressUsingId } from "../../../data/users/update.mjs";


export const user_editAddressGet = async (req,res)=>{
    const userId = req.query.id
    const user = await findUserUsingIdAndPopulateAddress(userId)
    console.log(user,'address is showing');
    // console.log(address.addresses);
    res.render('edit-address',{user})
}


export const user_editAddressPost = async (req,res) =>{
 
    const userAddressId = req.query.id

    const userAddresData = {
        name:req.body.name,
        phoneNumber:req.body.phoneNumber,
        homeAddress:req.body.homeAddress,
        city:req.body.city,
        country:req.body.country
    }

    const data = await updateUserAddressUsingId(userAddressId,userAddresData)
    console.log(data,'updated data is showing');
    res.redirect('/user-profile')

}