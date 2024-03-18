import mongoose from "mongoose"
const db = await import("../database.mjs").then((instance) => instance.default)

function userModel(collectionName, schema) {
    return db.model(collectionName, schema)
}

const userSchema = mongoose.Schema({
    full_name: {
        type: String,
        trim: true,
        required: true
    },
    last_name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        requied: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['user','admin'],
        requied:true
    },

})

export const userCollection = userModel('userData', userSchema)



  