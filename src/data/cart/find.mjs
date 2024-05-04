import { cartCollection } from "../../model/cart.mjs";

export async function findAllCartDatas (){
    return await cartCollection.findOne().populate('items.productId')
}

export async function findDuplicateCartProducts(userId,product){
    return await cartCollection.findOne({userId:userId,"items.productId":product})
}


export async function findCartDataUsingUserId(userId){
    return await cartCollection.findOne({userId:userId}).populate('items.productId')
}