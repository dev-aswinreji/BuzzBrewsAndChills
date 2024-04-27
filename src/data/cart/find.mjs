import { cartCollection } from "../../model/cart.mjs";

export async function findCartDatasOfUser (){
    return await cartCollection.find().populate('items.productId')
}