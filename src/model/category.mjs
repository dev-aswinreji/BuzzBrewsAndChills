import mongoose from "mongoose"

const db = await import ("./database.mjs").then((instance) => instance.default)

function categoryModel(collectionName, schema) {
    return db.model(collectionName, schema)
}


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim:true,
        required: true,
        unique:true
    },
    description:{
        type:String,
        trim:true,
        required:true
    },
    availability:{
        type:String,
        enum:['ACTIVE','ARCHIVE','UNAVAILABLE'],
        default:'ACTIVE',
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    discount:{
        type:Number
    }

})

export const categoryCollection = categoryModel('categories', categorySchema)
