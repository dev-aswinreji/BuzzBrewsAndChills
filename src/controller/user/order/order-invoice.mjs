import { findSingleOrder } from "../../../data/order/find.mjs"


export const user_orderInvoiceGet = async (req,res)=>{
    const orderId = req.query.orderId
    const orderData = await findSingleOrder(orderId)
    console.log(orderData,'order data is showing');
    res.render('order-invoice',{orderData})
}