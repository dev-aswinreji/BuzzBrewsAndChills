import { couponCollection } from "../../model/coupon.mjs";


export async function adminCouponStatusUpdate(couponId,couponStatus){
    if(couponStatus === 'ACTIVE'){
        return await couponCollection.findByIdAndUpdate(couponId,{couponStatus:'ARCHIVED'})
    }else if(couponStatus === 'ARCHIVED'){
        return await couponCollection.findByIdAndUpdate(couponId,{couponStatus:'ACTIVE'})
    }
}

export async function adminCouponUpdate(couponId,modifiedData){
    return await couponCollection.findByIdAndUpdate(couponId,modifiedData)
}