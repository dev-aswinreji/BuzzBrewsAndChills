import { findAllCartDatas } from "../../../data/cart/find.mjs"

export const user_cartGet = async (req,res)=>{

    

    const cart = await findAllCartDatas()

    res.render('cart',{cart})
}