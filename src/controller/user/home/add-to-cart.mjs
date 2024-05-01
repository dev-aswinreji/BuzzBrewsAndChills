import {findAllCartDatas, findDuplicateCartProducts} from "../../../data/cart/find.mjs"
import {addToCartData} from "../../../data/cart/insert.mjs"
import { addToCartDataSameProductUpdate } from "../../../data/cart/update.mjs"
import {findSingleProduct} from "../../../data/products/find.mjs"
import { checkDataDuplication } from "../../../validation/checking-duplicateData.mjs"


export const user_addToCartGet = async (req, res) => {
    const userId = req.session.USER_ID
    const productId = req.query.productId
    const quantity = req.query.quantity

    const product = await findSingleProduct(productId)
    const duplicateCartExistOrNot = await findDuplicateCartProducts(userId,product)
    const result = await checkDataDuplication(duplicateCartExistOrNot)
    console.log(result,'result');

    if(result === 'NOT EXIST'){
        
        await addToCartData(userId, product)

    }else{

        await addToCartDataSameProductUpdate(userId,product,quantity)

    }
    const data = await findAllCartDatas()
    console.log(productId, 'product id is showing');
    console.log('cart data also showing', data);
    res.json({success: 'success'})
}
