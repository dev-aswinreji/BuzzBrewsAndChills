import { findUniqueOrderToChangeOrderStatus } from "../../../data/order/find.mjs"

export const admin_orderDetailsGet = async (req,res)=> {
    const orderId = req.query.orderId
    const orderDetails = await findUniqueOrderToChangeOrderStatus(orderId)
    console.log(orderDetails,'order details is showing');
    res.render('order-details',{orderDetails})
}

export const admin_orderDetailsPost = async (req,res)=>{
    console.log(req.body,'req.body is showing');
    const orderDetails = {
        orderId:req.body.orderId,
        status:req.body.status,
        productId:req.body.productId
    }
    
    console.log(orderDetails,'order details is showing');
}