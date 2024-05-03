import {insertUserAddress} from "../../../data/users/insert.mjs"
import {updateUserUsingIdForAddress} from "../../../data/users/update.mjs"

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
    const path = req.body.path
    const userId = req.session.USER_ID

    const newAddress = await insertUserAddress(userAddress)

    await updateUserUsingIdForAddress(userId, newAddress)

    res.redirect(`/${path}`)
}
