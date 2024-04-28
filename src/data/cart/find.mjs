import { cartCollection } from "../../model/cart.mjs";

export async function findCartDatasOfUser (){
    return await cartCollection.find().populate('items.productId')
}

export async function findCartDataDuplicate (id,productId){
    return await cartCollection.findOne({userId:id,"items.productId":productId})
}