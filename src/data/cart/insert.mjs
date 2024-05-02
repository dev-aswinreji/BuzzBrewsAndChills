import {cartCollection} from "../../model/cart.mjs";

export async function addToCartData(userId, product, quantity = 1) {
    console.log(product,'product id is showing');
    await cartCollection.updateOne({
        userId: userId
    }, {
        $addToSet: {
            items: {
                productId: product,
                quantity: quantity
            }
        }
    }, {upsert: true})
}
