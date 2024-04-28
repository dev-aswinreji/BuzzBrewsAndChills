import Swal from "sweetalert2"
import {findSingleProduct} from "../../../data/products/find.mjs"
import {findUser, findUserUsingId} from "../../../data/users/find.mjs"
import {findCartDataDuplicate, findCartDatasOfUser} from "../../../data/cart/find.mjs"
import {insertCartData} from "../../../data/cart/insert.mjs"
import {checkDataDuplication} from "../../../validation/checking-duplicateData.mjs"
import { updateCartDatas } from "../../../data/cart/update.mjs"


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

        const product = await findSingleProduct(id)
        console.log(product, 'product data is showing ');
        const user = await findUser(userEmail)
        const cartDupicate = findCartDataDuplicate(id, user._id)
        const result = await checkDataDuplication(cartDupicate)
        if (result === 'NOT EXIST') {
            const cartData = {
                userId: user,
                items: [
                    {
                        productId: product,
                        quantity: 1
                    }
                ],
                totalPrice: 40
            }
            console.log(cartData, 'cart data is showing');
            console.log(cartData.items[0].productId.name);

            await insertCartData(cartData)
            
        }else{
            console.log('update data is working or not ');
            await updateCartDatas(user._id,id)
        }
        // window.location.reload()
        res.redirect(`/${path}`)
    } catch (error) {
        console.log(error, 'USER ADD TO CART GET');
        res.send(500)
    }
}
