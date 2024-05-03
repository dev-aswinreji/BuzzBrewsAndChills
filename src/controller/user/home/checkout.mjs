import Swal from "sweetalert2";
import {findUser, findUserAddressUsingPopulate} from "../../../data/users/find.mjs";
import {insertUserAddress} from "../../../data/users/insert.mjs";
import {updateUser} from "../../../data/users/update.mjs";


export const user_checkoutGet = async (req, res) => {

    try {


        const userEmail = req.session.userEmailForAddUserAddress

        const user = await findUserAddressUsingPopulate(userEmail)
        console.log(user)
        res.render('checkout', {user})

    } catch (error) {
        console.error(error, 'USER CHECKOUT GET')
    }
}
