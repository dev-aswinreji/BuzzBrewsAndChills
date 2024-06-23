import { ObjectId } from "mongodb";
import { cartCollection } from "../../model/cart.mjs";
import { findCartDataUsingUserId } from "./find.mjs";


export async function deleteCartProduct(userId,productRemoveId){
    const cart = await findCartDataUsingUserId(userId)
    console.log(cart.items.length,'what is the length');
    const result = cart.items.length === 1 ? await cartCollection.deleteOne({userId:userId,"items.productId":productRemoveId}) : await cartCollection.updateOne({userId:userId},{$pull:{items:{productId:productRemoveId}}})
    
    
    console.log(result)
    return result
    
}