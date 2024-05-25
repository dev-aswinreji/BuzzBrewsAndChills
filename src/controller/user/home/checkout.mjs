import Swal from "sweetalert2";
import {findDefaultUserAddressUsingPopulate, findUser, findUserAddressUsingPopulate} from "../../../data/users/find.mjs";
import {insertUserAddress} from "../../../data/users/insert.mjs";
import {updateUser} from "../../../data/users/update.mjs";
import { findAllCartDatas } from "../../../data/cart/find.mjs";
import { updateCartTotalPriceInCheckoutPage } from "../../../data/cart/update.mjs";


export const user_checkoutGet = async (req, res) => {

    try {

        const userId = req.session.USER_ID
        let cartDatas = await findAllCartDatas(userId)
        console.log(cartDatas.coupon_discount,'coupon discount is showing');
        console.log(cartDatas,'cart data is showing');
        const defaultAddress = await findDefaultUserAddressUsingPopulate(userId)
        console.log(defaultAddress)
        if(cartDatas.coupon_discount){
            const totalPrice = cartDatas.totalPrice - (cartDatas.totalPrice * (cartDatas.coupon_discount/100))
            await updateCartTotalPriceInCheckoutPage(userId,totalPrice)
            console.log(cartDatas,'cart data is updated');
            cartDatas = await findAllCartDatas(userId)  
            console.log(cartDatas,'is it working or not ');
        }
        
        res.render('checkout', {defaultAddress,cartDatas})

    } catch (error) {
        console.error(error, 'USER CHECKOUT GET')
    }
}
