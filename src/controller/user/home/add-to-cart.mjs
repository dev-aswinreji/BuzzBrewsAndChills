import {findDuplicateCartProducts} from "../../../data/cart/find.mjs"
import {addToCartData} from "../../../data/cart/insert.mjs"
import {addToCartDataSameProductUpdate} from "../../../data/cart/update.mjs"
import {findSingleProduct} from "../../../data/products/find.mjs"
import {checkDataDuplication} from "../../../validation/checking-duplicateData.mjs"


export const user_addToCartGet = async (req, res) => {
    const userId = req.session.USER_ID
    const productId = req.query.productId
    const quantityFromQuery = req.query.quantity
    console.log(quantityFromQuery,'quantity is showing');
    const stockFromQuery = req.query.stock
    const product = await findSingleProduct(productId)
    const cart = await findDuplicateCartProducts(userId,product)
    const result = await checkDataDuplication(cart)
    if (result === 'NOT EXIST') {
        await addToCartData(userId, product,quantityFromQuery)
        return res.json({result: 'within limit'})
    } else {
        const cartItem = cart.items.filter(item => item.productId._id.toString() === productId.toString())
        console.log(cartItem,'cart item is ============================================ i neeed to fix thisssssssssssssssssssssssssss showign');
        const cartQuantity = cartItem[0].quantity
        console.log(cartQuantity,'cart quantity is  ==================================================aklsfhasdjflojasolfjasdf==================================================showing');
        const stock = cartItem[0].productId.stock
        console.log(stock,'stock is showing is showing below ==================== ===================================');
        // if(stock <= cartQuantity){
            
        // }
        console.log(quantityFromQuery,'quantity from query is showing ========================');
        const response = cartQuantity < 10 ? await addToCartDataSameProductUpdate(userId, product, quantityFromQuery)
        .then(() => ({result: 'within limit'})) : ({result: 'limit exceeded'})
        console.log(response, 'response is showing');
        return res.json(response)
    }
}
