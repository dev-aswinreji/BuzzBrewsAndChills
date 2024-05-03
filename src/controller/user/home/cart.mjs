import {ObjectId} from "mongodb"
import {aggregationForTotalPrice} from "../../../data/cart/aggregation.mjs"
import {findAllCartDatas} from "../../../data/cart/find.mjs"
import {cartCollection} from "../../../model/cart.mjs"

export const user_cartGet = async (req, res) => {
    const userId = req.session.USER_ID

    const totalPrice = await aggregationForTotalPrice(userId)

    await cartCollection.updateOne({
        userId: userId
    }, {totalPrice: totalPrice[0].totalPrice})

    const cart = await findAllCartDatas()

    // res.render('cart', {cart})
    res.render('cart',{cart})
}
