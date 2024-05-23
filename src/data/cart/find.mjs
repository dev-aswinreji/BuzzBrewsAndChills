import { cartCollection } from "../../model/cart.mjs";

export async function findAllCartDatas (userId){
    return await cartCollection.findOne({userId:userId}).populate('items.productId')
}

export async function findDuplicateCartProducts(userId,product){
    return await cartCollection.findOne({userId:userId,"items.productId":product}).populate('items.productId')
}


export async function findCartDataUsingUserId(userId){
    return await cartCollection.findOne({userId:userId}).populate('items.productId')
}