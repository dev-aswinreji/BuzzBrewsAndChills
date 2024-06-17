import { findAllUserAddresses, findDefaultUserAddressUsingPopulate } from "../../../data/users/find.mjs";
import { findAllCartDatas } from "../../../data/cart/find.mjs";
import { updateCartTotalPriceInCheckoutPage } from "../../../data/cart/update.mjs";
import { findWalletAmount } from "../../../data/wallet/find.mjs";


export const user_checkoutGet = async (req, res) => {

    try {
        const userId = req.session.USER_ID
        let cartDatas = await findAllCartDatas(userId)
        const wallet = await findWalletAmount(userId)

        // console.log(cartDatas.couponDiscount, 'coupon discount is showing');
        // console.log(cartDatas, 'cart data is showing');
        let totalPrice = Number(req.query.totalPrice)

        console.log(totalPrice,'total price is showing');
        let updatedTotalPrice = totalPrice - (totalPrice * cartDatas.couponDiscount / 100)
        const userDatas = await findAllUserAddresses(userId)

        // console.log(userDatas.addresses,'addreses is showing')
        let addresses = userDatas === null ? [] : userDatas.addresses


        // console.log(addresses, 'address is showing ===========================================');
        // console.log(totalPrice, 'what is happening');
        // console.log(updatedTotalPrice, 'update total price is showing');
        if (cartDatas.couponDiscount && updatedTotalPrice !== cartDatas.totalPrice) {

            // console.log('what i happened why it not entered inside if statement');
            const total = cartDatas.totalPrice - (cartDatas.totalPrice * (cartDatas.couponDiscount / 100))

            const totalPrice = total.toFixed(2)
            await updateCartTotalPriceInCheckoutPage(userId, totalPrice)

            // console.log(cartDatas, 'cart data is updated');
            cartDatas = await findAllCartDatas(userId)

            // console.log(cartDatas, 'is it working or not ');
        }

        res.render('checkout', { addresses, cartDatas, totalPrice, userDatas, wallet })

    } catch (error) {
        console.error(error, 'USER CHECKOUT GET')
    }
}
