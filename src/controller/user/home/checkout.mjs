import Swal from "sweetalert2";
import {findDefaultUserAddressUsingPopulate, findUser, findUserAddressUsingPopulate} from "../../../data/users/find.mjs";
import {insertUserAddress} from "../../../data/users/insert.mjs";
import {updateUser} from "../../../data/users/update.mjs";
import { findAllCartDatas } from "../../../data/cart/find.mjs";


export const user_checkoutGet = async (req, res) => {

    try {

        const userId = req.session.USER_ID
        const cartDatas = await findAllCartDatas(userId)
        console.log(cartDatas,'cart data is showing');
        const defaultAddress = await findDefaultUserAddressUsingPopulate(userId)
        console.log(defaultAddress)
        res.render('checkout', {defaultAddress,cartDatas})

    } catch (error) {
        console.error(error, 'USER CHECKOUT GET')
    }
}
