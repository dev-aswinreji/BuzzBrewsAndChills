import { couponCollection } from "../../model/coupon.mjs";

export async function findAllCouponForAdmin (){
    try {
        return (await couponCollection.find()).reverse()

    } catch (error) {
        console.log(error,'find all coupon for admin func error');
    }
}

export async function findUniqueCouponForUser (couponCode){
    try {
        return await couponCollection.findOne({name:couponCode})
    } catch (error) {
        console.log(error,'find unique coupon for user func error');
    }
}