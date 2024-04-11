import Swal from "sweetalert2";
import {findUser, findUserAddressUsingPopulate} from "../../../data/users/find.mjs";
import {insertUserAddress} from "../../../data/users/insert.mjs";
import {updateUser} from "../../../data/users/update.mjs";


export const user_checkoutGet = async (req, res) => {

    try {

        if (req.session.isUserAuth) {
            const userEmail = req.session.userEmailForAddUserAddress

            const user = await findUserAddressUsingPopulate(userEmail)
            console.log(user)
            res.render('checkout', {user})
        } else {
            Swal.fire({title: 'Warning', text: 'Login To Continue', icon: 'warning'})
            res.redirect('/signin')
        }
    } catch (error) {
        console.error(error)
    }
}
export const user_addressPost = async (req, res) => {
    try {

        const data = {
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            homeAddress: req.body.homeAddress,
            city: req.body.city,
            country: req.body.country
        }

        const userAddress = await insertUserAddress(data)
        console.log(userAddress, 'userAddress is ==============')


        const userEmail = req.session.userEmailForAddUserAddress
        console.log(userEmail, 'userEmail is ?')


        const user = await findUser(userEmail)
        console.log(user, 'user data is found ===================')


        const success = await updateUser(user.email, userAddress)
        console.log(success)

        res.redirect('/checkout')

    } catch (error) {

        console.error(error)
    }

}
