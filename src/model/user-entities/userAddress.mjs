import mongoose, { Schema } from "mongoose"
const db = await import("../database.mjs").then((instance) => instance.default)

function userModel(collectionName, schema) {
    return db.model(collectionName, schema)
}

const userAddressSchema = mongoose.Schema({
    phonenumber: {
        type: Number,
        required: true
    },
    area: {
        type: String,
        requied: false
    },
    city: {
        type: String,
        requied: true
    },
    country: {
        type: String,
        requied: true
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'userData'
    }
})

export const userAddressCollection = userModel('userAddressData', userAddressSchema)


