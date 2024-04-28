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
        const userEmail = req.session.userEmailForAddUserAddress
        console.log('useremail is set', userEmail);
        console.log(id, 'product id pakka');
        const product = await findSingleProduct(id)
        console.log(product, 'product data is showing ');
        const user = await findUser(userEmail)
        console.log(user, 'user data is showing');
        const cartDupicate = await findCartDataDuplicate(user._id, id)
        console.log(cartDupicate, 'cart duplicate');
        const result = await checkDataDuplication(cartDupicate)
        console.log(result, 'result of check data dupe');
        if (result === 'NOT EXIST') {
            const cartData = {
                userId: user,
                items: [
                    {
                        productId: product,
                        quantity: 1
                    }
                ],
                totalPrice: product.price
            }
            // console.log(cartData, 'cart data is showing');
            // console.log(cartData.items[0].productId.name);

            await insertCartData(cartData)

        } else { // console.log('update data is working or not ');
            await updateCartDatas(user._id, id)
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

        const id = req.query.productId
        const userId = req.session.USER_ID
        const totalPrice = req.query.totalPrice

        await updateCartDataOfTotalPrice(userId,id,totalPrice)

    } catch (error) {
        console.log(error, 'USER ADD TO CART FETCH TO UPDATE TOTAL PRICE');
    }
}
