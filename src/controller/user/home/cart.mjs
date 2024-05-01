import { findAllCartDatas } from "../../../data/cart/find.mjs"

export const user_cartGet = async (req,res)=>{
    const cart = await findAllCartDatas()

    // console.log(cart.items[0].productId.price,'cart datas is showing');
    res.render('cart',{cart})
}