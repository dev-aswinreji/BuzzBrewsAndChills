import { cartCollection } from "../../model/cart.mjs";

export async function removeCouponFromCart(userId){
    return await cartCollection.updateOne({userId:userId},{$unset:{couponCode:1,couponDiscount:1}})
}