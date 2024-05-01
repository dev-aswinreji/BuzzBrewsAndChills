import { ObjectId } from "mongodb";
import {cartCollection} from "../../model/cart.mjs";
import { findAllCartDatas } from "./find.mjs";


export async function addToCartDataSameProductUpdate(userId, product,quantity=1) {

    await cartCollection.updateOne({
        userId: userId,
        "items.productId": product
    }, {
        $inc: {
           "items.$.quantity":quantity,
        }
    })

    const uniqueProduct = await cartCollection.findOne({"items.productId":new ObjectId(product._id)})
    console.log(uniqueProduct,'unique product is showing');

}
