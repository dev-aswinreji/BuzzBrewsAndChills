

import mongoose from "mongoose"
import { categoryCollection } from "./category.mjs"
import moment from "moment"

const db = await import("./database.mjs").then((instance) => instance.default)

function productModel(collectionName, schema) {
    return db.model(collectionName, schema)
}

const productsSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: categoryCollection,
    },
    availability:{
        type:String,
        enum:['AVAILABLE','UNAVAILABLE'],
        default:'AVAILABLE',
        required:true
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    imageUrl:{
        type:Array,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    discount:{
        type:Number,
    },
    discount_price:{
        type:Number,

    }
})

export const productCollection = productModel('products', productsSchema)