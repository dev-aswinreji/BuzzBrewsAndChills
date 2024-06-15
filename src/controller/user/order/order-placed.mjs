

export const user_orderPlacedGet = async (req,res)=>{
    try {
        const order = req.session.ORDER_PLACED
        // console.log(order[0].products,'order is showing in orderplaced page');   
        res.render('order-placed',{order})
        // req.session.ORDER_PLACED = false
        console.log('line of code is showing after render');
    } catch (error) {
        console.log(error,'USER ORDER PLACE GET');
    }
   
}