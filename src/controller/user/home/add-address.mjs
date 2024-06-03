import { findUserAddressUsingIdAndPopulate } from "../../../data/users/find.mjs"
import {insertUserAddress} from "../../../data/users/insert.mjs"
import {updateUserUsingIdForAddress} from "../../../data/users/update.mjs"

export const user_addAddressGet = async (req, res) => {

    res.render('add-address')

}

export const user_addAddressPost = async (req, res) => {

  
    const path = req.body.path
    const userId = req.session.USER_ID
    const userDataWithAddress = await findUserAddressUsingIdAndPopulate(userId)

    console.log(userDataWithAddress.addresses.length,'user data is showing');
    let isFirstAddress = userDataWithAddress.addresses.length === 0  
        
    const userAddress = {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        homeAddress: req.body.homeAddress,
        city: req.body.city,
        state:req.body.state,
        country: req.body.country,
        pincode:req.body.pincode,
        // isDefault:isFirstAddress?'YES':'NO'
    }
    console.log(userAddress,'user addres haha');
    console.log(userAddress.isDefault,'is default is');
    const newAddress = await insertUserAddress(userAddress)
    await updateUserUsingIdForAddress(userId, newAddress)

    res.redirect(`/${path}`)
}
