import { findUniqueOrderToChangeOrderStatus } from "../../../data/order/find.mjs"

export const admin_orderDetailsGet = async (req,res)=> {
    const orderId = req.query.orderId
    const orderDetails = await findUniqueOrderToChangeOrderStatus(orderId)
    console.log(orderDetails,'order details is showing');
    res.render('order-details',{orderDetails})
}