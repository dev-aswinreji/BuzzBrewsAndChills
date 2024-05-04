import { ObjectId } from "mongodb";
import { cartCollection } from "../../model/cart.mjs";


export async function deleteCartProduct(userId,productRemoveId){
    
    const result = await cartCollection.deleteOne({userId:userId,"items.productId":productRemoveId})
    
    console.log(result)
    return result
    
}