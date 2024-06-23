import { findUserUsingId } from "../../../data/users/find.mjs";
import { sendEmailForOrderPlaced } from "../../../utils/sendMail-orderPlaced.mjs";


export const user_orderPlacedGet = async (req,res)=>{
    try {
        const order = req.session.ORDER_PLACED
        // console.log(order[0].products,'order is showing in orderplaced page');   
        const userId = req.session.USER_ID
        const user = await findUserUsingId(userId)
        sendEmailForOrderPlaced(user,order)
        res.render('order-placed',{order})
        // req.session.ORDER_PLACED = false
        console.log('line of code is showing after render');
    } catch (error) {
        console.log(error,'USER ORDER PLACE GET');
    }
   
}