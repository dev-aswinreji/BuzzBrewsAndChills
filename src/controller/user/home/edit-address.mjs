import { findUserAddress, findUserAddressUsingId } from "../../../data/users/find.mjs";
import {updateUserAddressUsingId} from "../../../data/users/update.mjs";


export const user_editAddressGet = async (req, res) => {
    const addressId = req.query.id
    console.log(addressId, 'userId is getting');
    const address = await findUserAddressUsingId(addressId)
    console.log(address);
    res.render('edit-address', {address})
}


export const user_editAddressPost = async (req, res) => {

    const userAddressId = req.query.id
    console.log(userAddressId, 'whay it is not working');
    const userAddresData = {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        homeAddress: req.body.homeAddress,
        city: req.body.city,
        country: req.body.country
    }

    const data = await updateUserAddressUsingId(userAddressId, userAddresData)
    console.log(data, 'updated data is showing');
    res.redirect('/user-profile')

}
