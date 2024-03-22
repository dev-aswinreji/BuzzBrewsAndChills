import mongoose, { Schema } from "mongoose"
const db = await import("./database.mjs").then((instance) => instance.default)

function userModel(collectionName, schema) {
    return db.model(collectionName, schema)
}

const userAddressSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    phonenumber: {
        type: Number,
        required: true
    },
    home_address: {
        type: String,
        requied: true
    },
    city: {
        type: String,
        requied: true
    },
    country: {
        type: String,
        requied: true
    },

})

export const userAddressCollection = userModel('userAddressData', userAddressSchema)


