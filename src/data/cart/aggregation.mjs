import { ObjectId } from "mongodb"
import { cartCollection } from "../../model/cart.mjs"
import {addToCartData} from "./insert.mjs"

export async function aggregationForTotalPrice(userId) {


    return await cartCollection.aggregate([
        {
            $match: {
                userId: new ObjectId(userId)
            }
        },
        {
            $unwind: "$items"
        },
        {
            $lookup: {
                from: "products",
                localField: "items.productId",
                foreignField: "_id",
                as: "products"
            }
        },
        {
            $unwind: "$products"
        }, {
            $group: {
                _id: "$userId",
                items: {
                    $push: "$items"
                },
                products: {
                    $push: "$products"
                },
                totalPrice: {
                    $sum: {
                        "$multiply": ["$products.price", "$items.quantity"]
                    }
                }
            }
        }, {
            $project: {
                _id: false
            }
        }
    ])

}
