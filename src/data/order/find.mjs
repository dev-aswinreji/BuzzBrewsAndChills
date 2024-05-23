import { orderCollection } from "../../model/order.mjs";


export async function findOrderData (userId){
    try {
        return await orderCollection.find({userId:userId}).sort({createdAt:-1})
    } catch (error) {
        console.log(error,'error occured in find order data func');
    }
}

export async function findAllOrderDataForAdmin (){
    try {
        return await orderCollection.find().sort({timeStamp:-1})
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