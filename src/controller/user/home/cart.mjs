import Swal from "sweetalert2"
import {findSingleProduct} from "../../../data/products/find.mjs"
import {findUser, findUserUsingId} from "../../../data/users/find.mjs"
import {findCartDataDuplicate, findCartDatasOfUser} from "../../../data/cart/find.mjs"
import {insertCartData} from "../../../data/cart/insert.mjs"
import {checkDataDuplication} from "../../../validation/checking-duplicateData.mjs"
import {updateCartDataOfTotalPrice, updateCartDatas} from "../../../data/cart/update.mjs"


export const user_cartGet = async (req, res) => {

    try {


        const cartDatas = await findCartDatasOfUser()
        console.log('inserted cart data is working', cartDatas);
        res.render('cart', {cartDatas})


    } catch (error) {
        console.error(error)
    }

}


export const user_addToCartGet = async (req, res) => {
    try {
        const id = req.query.productId
        const path = req.query.path
        const userId = req.session.USER_ID
        const quantity = req.query.quantity
        const product = await findSingleProduct(id)
        console.log(product, 'product data is showing ');

        console.log(userId, 'user id is showing');
        const cartDupicate = await findCartDataDuplicate(userId, id)
        console.log(cartDupicate, 'cart duplicate');
        const result = await checkDataDuplication(cartDupicate)
        console.log(result, 'result of check data dupe');
        if (result === 'NOT EXIST') {
            const cartData = {
                userId: userId,
                items: [
                    {
                        productId: product,
                        quantity: 1
                    }
                ],
                totalPrice: product.price
            }


            await insertCartData(cartData)

        } else { 
            if(quantity>1){
                await updateCartDatas(userId, product,quantity)
                
            }else{

                await updateCartDatas(userId,product)
            }
        }
        // window.location.reload()
        res.redirect(`/${path}`)
    } catch (error) {
        console.log(error, 'USER ADD TO CART GET');
        res.send(500)
    }
}

export const user_addToCartFetchToUpdatingTotalPrice = async (req, res) => {
    try {

        const productId = req.query.productId
        const userId = req.session.USER_ID
        const totalPrice = req.query.totalPrice
        const quantity = req.query.quantity
        console.log(productId, userId, totalPrice, quantity);

        await updateCartDataOfTotalPrice(userId, productId, quantity, totalPrice)

        res.json({id: userId})

    } catch (error) {
        console.log(error, 'USER ADD TO CART FETCH TO UPDATE TOTAL PRICE');
    }
}
