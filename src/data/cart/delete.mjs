import { ObjectId } from "mongodb";
import { cartCollection } from "../../model/cart.mjs";


export async function deleteCartProduct(userId,productRemoveId){
    
    const result = await cartCollection.updateOne({userId:userId},{$pull:{items:{productId:productRemoveId}}})
    
    console.log(result)
    return result
    
}