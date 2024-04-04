import mongoose from "mongoose"

const db = await import ("./database.mjs").then((instance) => instance.default)

function productModel(collectionName, schema) {
    return db.model(collectionName, schema)
}


const categorySchemaCoolDrink = new mongoose.Schema({
    name: {
        type: String,
        trim:true,
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "products"
    }],

})

export const categoryCoolDrinkCollection = productModel('categoryCoolDrink', categorySchemaCoolDrink)
