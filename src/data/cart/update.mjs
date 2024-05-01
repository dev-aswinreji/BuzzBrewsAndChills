import {cartCollection} from "../../model/cart.mjs";
import { findAllCartDatas } from "./find.mjs";


export async function addToCartDataSameProductUpdate(userId, product,quantity) {

    await cartCollection.updateOne({
        userId: userId,
        "items.productId": product
    }, {
        $inc: {
           "items.$.quantity":1,
        }
    })

    const cart = await findAllCartDatas()
    console.log(cart,'inside update mjs');

}
