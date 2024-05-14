import { orderCollection } from "../../model/order.mjs";


export async function findOrderData (userId){
    return await orderCollection.find({userId:userId}).populate('items.productId').sort({createdAt:-1})
}

export async function findAllOrderDataForAdmin (){
    return await orderCollection.find().populate('userId').populate('items.productId')
}