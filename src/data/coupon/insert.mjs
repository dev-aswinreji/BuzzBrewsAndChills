import { couponCollection } from "../../model/coupon.mjs";


export async function insertCouponAdmin (data){
    try {
        return await couponCollection.create(data)

    } catch (error) {
        console.log(error,'insert coupon admin func');
    }
}