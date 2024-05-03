
export const user_paymentGet = async (req,res)=>{
    req.session.USER_ORDER_DEFAULT_ADDRESSID = req.query.addressId
    res.render('payment')
}