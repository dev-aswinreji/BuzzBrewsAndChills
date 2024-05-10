import { razorpayInstance } from "../../../utils/razorpay.mjs"

export const user_razorpay = async (req,res)=>{
    const {amount} = req.body
    const currency = 'INR'
    const order = await razorpayInstance.orders.create({amount,currency})
    console.log(order,'order is showing');
}