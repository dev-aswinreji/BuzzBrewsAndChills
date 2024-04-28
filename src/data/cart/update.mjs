import {cartCollection} from "../../model/cart.mjs";


export async function updateCartDatas(id, product,quantity = 1) {
    console.log(product.price,'what is happening');
    const data = await cartCollection.updateOne({
        userId: id,
        "items.productId": product._id
    }, {
        $inc: {
            'items.$.quantity': quantity,
            totalPrice: product.price * quantity
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
