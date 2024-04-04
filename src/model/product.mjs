

import mongoose from "mongoose"
import { categoryCoolDrinkCollection } from "./category.mjs"

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
        ref: categoryCoolDrinkCollection,
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