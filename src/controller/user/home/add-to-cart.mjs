import {findDuplicateCartProducts} from "../../../data/cart/find.mjs"
import {addToCartData} from "../../../data/cart/insert.mjs"
import {addToCartDataSameProductUpdate} from "../../../data/cart/update.mjs"
import {findSingleProduct} from "../../../data/products/find.mjs"
import {checkDataDuplication} from "../../../validation/checking-duplicateData.mjs"


export const user_addToCartGet = async (req, res) => {
    const userId = req.session.USER_ID
    const productId = req.query.productId
    const quantity = req.query.quantity
    const stock = req.query.stock
    console.log(stock);
    console.log(quantity,'quantity of product as query');
    const product = await findSingleProduct(productId)
    console.log(product,'product data is showing');
    const cart = await findDuplicateCartProducts(userId)
    console.log(cart,'cart data is showing ===================================');
    const result = await checkDataDuplication(cart)


    if (result === 'NOT EXIST') {
        await addToCartData(userId, product)
        return res.json({result: 'within limit'})
    } else {
        const cartItem = cart.items.filter(item => item.productId._id.toString() === productId.toString())
        console.log(cartItem,'what is inside cartItem=======================================l;fjglk;sd======================');
        const quantity = cartItem[0].quantity
        const stock = cartItem[0].productId.stock
        console.log(stock,'stock is showing');
        console.log(quantity, 'quantity of each product is');
        const response = stock > 0 && quantity < 10 ? await addToCartDataSameProductUpdate(userId, product, quantity)
        .then(() => ({result: 'within limit'})) : ({result: 'limit exceeded'})
        console.log(response, 'response is showing');
        return res.json(response)
    }


    // res.json({success: 'success'})
}
