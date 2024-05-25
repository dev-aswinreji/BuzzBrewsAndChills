

import moment from "moment"
import mongoose, { Schema } from "mongoose"

const db = await import("./database.mjs").then((instance) => instance.default)

function cartModel(collectionName, schema) {
    return db.model(collectionName, schema)
}



const cartSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'userData',
        required:true
    },
    items: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'products',
            required:true
        },
        quantity:{
            type:Number,
            min:1,
            required:true
        }
    }],
    totalPrice:{
        type:Number,
        min:0,
        required:true,
    },
    coupon_discount:{
        type:Number,
    }

})


export const cartCollection = cartModel('cart',cartSchema)