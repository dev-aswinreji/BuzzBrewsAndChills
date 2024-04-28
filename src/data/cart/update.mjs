import {cartCollection} from "../../model/cart.mjs";


export async function updateCartDatas(id, productId) {
    const data = await cartCollection.updateOne({
        userId: id,
        "items.productId": productId
    }, {
        $inc: {
            'items.$.quantity': 1,
            totalPrice: 1
        }
    })
    console.log(data, 'updated data is showing');
}

export async function updateCartDataOfTotalPrice(id, productId, quantity, totalPrice) {

    await cartCollection.updateOne({
        userId: id,
        "items.productId": productId
    }, {
        $set: {
            "items.$.quantity": quantity,
            totalPrice: totalPrice
        }
    })
}
