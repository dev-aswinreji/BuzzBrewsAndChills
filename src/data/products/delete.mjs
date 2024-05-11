import { productCollection } from "../../model/product.mjs";


export async function deleteProductImageUsingFetch(productId,imageUrl){
    return await productCollection.updateOne({_id:productId},{$pull:{imageUrl:imageUrl}})
}