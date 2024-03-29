

import moment from "moment"
import mongoose from "mongoose"

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
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    imageUrl:{
        type:String,
        required:true
    },
    createdAt:{
        type:String,
        default:Date(),
    }
})

export const productCollection = productModel('products', productsSchema)