import { orderCollection } from "../../model/order.mjs";


export async function findOrderData (userId){
    try {
        return await orderCollection.find({userId:userId}).sort({timeStamp:-1})
    } catch (error) {
        console.log(error,'error occured in find order data func');
    }
}

export async function findAllOrderDataForAdmin (skip,limit){
    try {
        return await orderCollection.find().sort({timeStamp:-1}).skip(skip).limit(limit)
    } catch (error) {
        console.log(error,'error occured in find all order data for admin func');
    }
   
}

export async function findUniqueOrderToChangeOrderStatus (orderId){
    try {
        return await orderCollection.findById(orderId)
    } catch (error) {
        console.log(error,'error occured in find unique order to change order status func');
    }
}

export async function findTotalCountOfAllOrdersForAdmin (){
    return await orderCollection.countDocuments()
}

export async function findSingleOrder (orderId){
    return await orderCollection.findOne({orderId:orderId})
}