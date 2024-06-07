import { couponCollection } from "../../model/coupon.mjs";

export async function findAllCouponForAdmin(skip, limit) {
    try {
        return await couponCollection.find().skip(skip).limit(limit).sort({ _id: -1 })
       

    } catch (error) {
        console.log(error, 'find all coupon for admin func error');
    }
}

export async function findUniqueCouponForUser(couponCode) {
    try {
        return await couponCollection.findOne({ name: couponCode })
    } catch (error) {
        console.log(error, 'find unique coupon for user func error');
    }
}


export async function findTotalNumberOfCouponCountForAdmin() {
    try {
        return await couponCollection.countDocuments()
    } catch (error) {
        console.log(error, 'find total number of coupon count for admin func');
    }
}