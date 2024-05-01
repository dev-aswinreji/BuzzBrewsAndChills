import {findAllCartDatas, findDuplicateCartProducts} from "../../../data/cart/find.mjs"
import {addToCartData} from "../../../data/cart/insert.mjs"
import {addToCartDataSameProductUpdate} from "../../../data/cart/update.mjs"
import {findSingleProduct} from "../../../data/products/find.mjs"
import {checkDataDuplication} from "../../../validation/checking-duplicateData.mjs"


export const user_addToCartGet = async (req, res) => {
    const userId = req.session.USER_ID
    const productId = req.query.productId
    const quantity = req.query.quantity

    const product = await findSingleProduct(productId)

    const cart = await findDuplicateCartProducts(userId, product)

    const result = await checkDataDuplication(cart)


    if (result === 'NOT EXIST') {
        await addToCartData(userId, product)
        return res.json({result: 'within limit'})
    } else {
            const cartItem = cart.items.find(item => item.productId.toString() === productId.toString())
            const cartQuantityOfSpecificProduct = cartItem.quantity
            console.log(cartQuantityOfSpecificProduct, 'quantity of each product is');
            const response = cartQuantityOfSpecificProduct< 10 ? await addToCartDataSameProductUpdate(userId, product, quantity)
            .then(() =>({result: 'within limit'})) : ({result: 'limit exceeded'})
        console.log(response,'response is showing');
        return res.json(response)
    }
d

    // res.json({success: 'success'})
}
