
import moment from "moment"
import { ObjectId } from "mongodb"
import mongoose from "mongoose"

const db = await import("./database.mjs").then((instance) => instance.default)

function googleModel(collectionName, schema) {
    return db.model(collectionName, schema)
}


const googleSchema = mongoose.Schema({
    googleId: {
        type: String,
        required: true,
    },
    accountStatus: {
        type: String,
        enum: ['BLOCKED', 'ACTIVE'],
        default: 'ACTIVE',
        required: true
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER',
        required: true
    },
    fullName: {
        type: String,
        trim:true,
        required: true,

    },
    email: {
        type: String,
        unique:true,
        required: true
    },
    addresses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userAddressData'
    }],
    accountCreated: {
        type: String,
        default: moment().format('YYYY/MM/DD')
    }
})


export const googleCollection = googleModel('google', googleSchema)