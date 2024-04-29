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

export const user_addToCartLimitChecking = async (req, res) => {}

async function singleProduct(userId, product, cartQuantityCheck, quantity, req, res, path) {
    if (! quantity) {
        let quantityNumber = Number(cartQuantityCheck.items[0].quantity)
        return quantityNumber <= 10 ? await updateCartDatas(userId, product) : res.redirect(`/${path}`)
    } else {

        let quantityNumber = Number(cartQuantityCheck.items[0].quantity) + quantity
        return quantityNumber <= 10 ? await updateCartDatas(userId, product) : res.json({id: 'error'})
    }
}

export const user_addToCartGet = async (req, res) => {
    try {
        const id = req.query.productId
        console.log(id, 'product id is working');
        const userId = req.session.USER_ID
        const quantity = req.query.quantity
        const product = await findSingleProduct(id)
        if (quantity > 10) {
            return res.json({id: 'error'})
        }
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

        } else { // if (quantity <= 10) {
            const cartQuantityCheck = await findCartDataDuplicate(userId, product)
            if (! quantity) {
                let quantityNumber = Number(cartQuantityCheck.items[0].quantity);
                let response = (quantityNumber < 10) ? await updateCartDatas(userId, product).then(() => ({id: 'success'})) : {
                    id: 'error'
                };
              res.json(response);
            } else {

                let quantityNumber = Number(cartQuantityCheck.items[0].quantity) + Number(quantity)
                let response = (quantityNumber <= 10) ? await updateCartDatas(userId, product).then(()=>({id:'success'})) : ({id: 'error'})
                res.json(response)
            }

            // }
        }

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

        res.json({id: "success"})

    } catch (error) {
        console.log(error, 'USER ADD TO CART FETCH TO UPDATE TOTAL PRICE');
    }
}

export const user_addToCartAggregationToShowTotalAmount = async (req, res) => {

    try {

        const totalPrice = req.query.totalPrice

    } catch (error) {
        console.log(error, 'USER ADD TO CART AGGREGATION');
    }

}
