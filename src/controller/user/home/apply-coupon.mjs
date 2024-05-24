import { findUniqueCouponForUser } from "../../../data/coupon/find.mjs"
import { findUserUsingId } from "../../../data/users/find.mjs";
import { checkDataDuplication } from "../../../validation/checking-duplicateData.mjs";


export const user_applyCoupon = async (req,res)=>{
    try {
        const USER_ID = req.session.USER_ID
        const couponCode = req.query.couponCode
        const totalCartPrice = Number(req.query.totalCartPrice)
        console.log(typeof totalCartPrice,'total price is shwoing');
        console.log(couponCode,'couponcode is shwoing');
        const coupon = await findUniqueCouponForUser(couponCode)
        const result = await checkDataDuplication(coupon)
        console.log(result,'result is showing ');
        if(result === 'NOT EXIST'){
            res.json({result:'Invalid Coupon'})
        }else if (result==='EXIST'){
           const userData = await findUserUsingId(USER_ID)
           console.log(userData,'user data finded');
        }
    } catch (error) {
        console.log(error,'user apply coupon get');
        res.status(500).send('Internal Server Error')
    }
   
}