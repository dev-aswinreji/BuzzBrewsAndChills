import {findDefaultUserAddressUsingPopulate} from "../../../data/users/find.mjs";
import { findAllCartDatas } from "../../../data/cart/find.mjs";
import { updateCartTotalPriceInCheckoutPage } from "../../../data/cart/update.mjs";


export const user_checkoutGet = async (req, res) => {

    try {

        const userId = req.session.USER_ID
        let cartDatas = await findAllCartDatas(userId)
        console.log(cartDatas.coupon_discount,'coupon discount is showing');
        console.log(cartDatas,'cart data is showing');
        let totalPrice = Number(req.query.totalPrice)
        let updatedTotalPrice = totalPrice - (totalPrice * cartDatas.coupon_discount/100)
        const defaultAddress = await findDefaultUserAddressUsingPopulate(userId)
        console.log(defaultAddress)
        console.log(totalPrice,'what is happening');
        console.log(updatedTotalPrice,'update total price is showing');
        if(cartDatas.coupon_discount && updatedTotalPrice !== cartDatas.totalPrice){
            const totalPrice = cartDatas.totalPrice - (cartDatas.totalPrice * (cartDatas.coupon_discount/100))
            await updateCartTotalPriceInCheckoutPage(userId,totalPrice)
            console.log(cartDatas,'cart data is updated');
            cartDatas = await findAllCartDatas(userId)  
            console.log(cartDatas,'is it working or not ');
        }
        
        res.render('checkout', {defaultAddress,cartDatas,totalPrice})

    } catch (error) {
        console.error(error, 'USER CHECKOUT GET')
    }
}
