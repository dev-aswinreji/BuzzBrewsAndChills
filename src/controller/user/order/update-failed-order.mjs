import { paymentFailedOrderUpdating } from "../../../data/order/update.mjs"


export const user_orderFailedUpdate = async (req, res) => {
    const { orderId } = req.query
    console.log(orderId, 'order id is showing');
    const userId = req.session.USER_ID
    const orderDataSuccess = await paymentFailedOrderUpdating(userId, orderId)
    req.session.ORDER_PLACED = orderDataSuccess
    console.log(orderDataSuccess, 'rsult is showing');
    res.json({ result: 'success' })
}