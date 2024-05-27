import { updateCartTotalPriceInCheckoutPage } from "../../../data/cart/update.mjs"
import { removeCouponFromCart } from "../../../data/coupon/delete.mjs"


export const user_removeCouponGet = async (req,res)=>{
    const userId = req.session.USER_ID
    const totalPrice = Number(req.query.totalPrice)
    const discount = Number(req.query.couponDiscount)
    console.log(discount,'discount is showing');
    const updatedTotalPrice = totalPrice / (1-discount/100)
    console.log(updatedTotalPrice,'updatedPrice is showing');
    await updateCartTotalPriceInCheckoutPage(userId,updatedTotalPrice)
    const couponDeleted = await removeCouponFromCart(userId)

    console.log(couponDeleted,'coupon delted is showing');
    res.json({result:'success'})
}