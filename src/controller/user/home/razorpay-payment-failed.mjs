import { paymentFailedCreateOrder } from "../../../data/order/insert.mjs"

export const user_paymentFailedHandler = async (req, res) => {
    console.log(req.body,'req. quyery is ssssssssssssssssssssssssssssssssss');
    const userId = req.session.USER_ID;
    const paymentMethod = req.body.paymentMethod;
    const paymentId = req.body.paymentId
    const address = req.body.address
    const couponDiscount = req.body.couponDiscount || 0
    const failedOrder = await paymentFailedCreateOrder(userId, address, paymentMethod, paymentId, couponDiscount)
    console.log(failedOrder,'result is shwoing');
    res.json({result:'success',failedOrder:failedOrder})
}


export const user_paymentFailedPage = async (req,res)=>{
    try {
        res.render('payment-failed')
    } catch (error) {
        console.log(error,'PAYMENT FAILED GET PAGE ERROR');
    }
}

