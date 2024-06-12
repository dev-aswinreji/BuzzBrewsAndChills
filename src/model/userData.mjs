import moment from "moment"
import mongoose, { Schema } from "mongoose"

const db = await import("./database.mjs").then((instance) => instance.default)

function userModel(collectionName, schema) {
    return db.model(collectionName, schema)
}

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        requied: true,
        unique:true,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER',
        required: true
    },
    accountStatus:{
        type:String,
        enum:['BLOCKED','ACTIVE'],
        default:'ACTIVE',
        required:true
    },
    addresses: [{
        type: Schema.Types.ObjectId,
        ref: 'userAddressData'
    }],
    accountCreated: {
        type: String,
        default: moment().format('YYYY/MM/DD')
    },
    coupon:{
        type:Array,
        required:true
    }

})

export const userCollection = userModel('userDatas', userSchema)



