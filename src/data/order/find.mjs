import { orderCollection } from "../../model/order.mjs";


export async function findOrderData (userId){
    return await orderCollection.find({userId:userId}).populate('items.productId')
}