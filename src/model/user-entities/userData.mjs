import moment from "moment"
import mongoose, { Schema } from "mongoose"

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
        enum: ['USER', 'ADMIN'],
        default: 'USER',
        required: true
    },
    ownerId: [{
        type: Schema.Types.ObjectId,
        ref: 'userAddressData'
    }],
    accountCreated: {
        type: String,
        default: moment().format('YYYY/MM/DD')
    }

})

export const userCollection = userModel('userData', userSchema)



