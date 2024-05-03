import { findUserAddress, findUserAddressUsingIdAndPopulate } from "../../../data/users/find.mjs"
import {insertUserAddress} from "../../../data/users/insert.mjs"
import { updateUserUsingIdForAddress } from "../../../data/users/update.mjs"

export const user_addAddressGet = async (req, res) => {

    res.render('add-address')

}

export const user_addAddressPost = async (req, res) => {

    const userAddress = {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        homeAddress: req.body.homeAddress,
        city: req.body.city,
        country: req.body.country
    }
    const userId = req.session.USER_ID
    const addresses = await insertUserAddress(userAddress)
    console.log(addresses,'user addresses are showing below ==================================================xxxxxxxxxx=============================');
    // await updateUserUsingIdForAddress(userId,addresses)
    const allAddress = await findUserAddressUsingIdAndPopulate(userId)
  
    console.log(allAddress,'user address all of them========================================================================================yyyyyyyyyyyyyyyyyyyyyyyyyyyyyy===========================');
    res.redirect('/address')
}
