import { removeCouponFromCart } from "../../../data/coupon/delete.mjs"


export const user_removeCouponGet = async (req,res)=>{
    const userId = req.session.USER_ID
    const totalCartPrice = req.query.totalPrice
    const discountPrice = totalPrice + (totalPrice * (discount/100))

    const couponDeleted = await removeCouponFromCart(userId)

    console.log(couponDeleted,'coupon delted is showing');
    res.json({result:'success'})
}