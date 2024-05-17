

export const user_orderPlacedGet = async (req,res)=>{
    const order = req.session.ORDER_PLACED
    // console.log(order,'order is showing in orderplaced page');
    res.render('order-placed',{})
}