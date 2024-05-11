


import moment from "moment"
import mongoose, { Schema } from "mongoose"

const db = await import("./database.mjs").then((instance) => instance.default)

function cartModel(collectionName, schema) {
    return db.model(collectionName, schema)
}



const orderSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'userData',
        required:true
    },
    orderId:{
        type:String,
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
        },
        price:{
            type:Number,
            required:true
        }
    }],
    totalPrice:{
        type:Number,
        min:0,
        required:true,
    },
    status:{
        type:String,
        enum:['PROCESSING','OUT FOR DELIHVERY','DELIVERED'],
        default: 'PROCESSING'
    },
    paymentMethod:{
        type:String,
        required:true,
    },
    productStatus:{
        type:String,
        enum :['ACTIVE','CANCELLED'],
        default:'ACTIVE'
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    paymentId:{
        type:String,
        
    }

})


export const orderCollection = cartModel('order',orderSchema)