import { addToCartDataManageQuantity } from "../../../data/cart/update.mjs"
import { findSingleProduct } from "../../../data/products/find.mjs"

export const user_addToCartManageGet = async (req,res) => {
    const userId = req.session.USER_ID
    const productId = req.query.productId
    const quantity = req.query.quantity
    console.log(userId,'user id');
    console.log(productId,'productId');
    const product = await findSingleProduct(productId) 
    await addToCartDataManageQuantity(userId,product,quantity)
    res.json({result:'within limit'})
}
