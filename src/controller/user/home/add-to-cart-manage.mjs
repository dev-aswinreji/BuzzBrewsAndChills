import { ObjectId } from "bson"
import { aggregationForTotalPrice } from "../../../data/cart/aggregation.mjs"
import { addToCartDataManageQuantity } from "../../../data/cart/update.mjs"
import { findSingleProduct } from "../../../data/products/find.mjs"
import { cartCollection } from "../../../model/cart.mjs"

export const user_addToCartManageGet = async (req,res) => {
    const userId = req.session.USER_ID
    const productId = req.query.productId
    const quantity = req.query.quantity
    console.log(quantity,'quanitity from query is showing');
    console.log(userId,'user id');
    console.log(productId,'productId');

    const product = await findSingleProduct(productId) 

    await addToCartDataManageQuantity(userId,product,quantity)

    const uniqueProduct = await cartCollection.findOne({userId:userId,
        "items.productId": new ObjectId(product._id)
    })

    console.log(uniqueProduct,'uniqueProduct');
    console.log(uniqueProduct.items,'unique product items');

    const quantityFromUpdatedData = uniqueProduct.items.filter(item =>item.productId.toString()=== product._id.toString())

    console.log(quantityFromUpdatedData,'quantitiy of unique product is shwoing');

    const totalPrice = await aggregationForTotalPrice(userId);

    console.log(totalPrice,'total price is showing ');
    
    res.json({result:'within limit',totalPrice:totalPrice,quantityFromUpdatedData:quantityFromUpdatedData})
}
