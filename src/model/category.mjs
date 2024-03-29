import mongoose from "mongoose"

const db = await import ("./database.mjs").then((instance) => instance.default)

function productModel(collectionName, schema) {
    return db.model(collectionName, schema)
}


const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    list: {
        type: Number,
        required: true
    }
})

export const categoryCollection = productModel('category', categorySchema)
