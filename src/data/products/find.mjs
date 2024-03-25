import { productCollection } from "../../model/product.mjs";


export async function findProduct (data){
    console.log('inside findproduct function')
    return await productCollection.findOne({_id:data})

}