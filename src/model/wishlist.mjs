

import moment from "moment";
import mongoose, { Schema } from "mongoose";

const db = await import("./database.mjs").then((instance) => instance.default);

function wishlistModel(collectionName, schema) {
  return db.model(collectionName, schema);
}

const wishlistSchema = new mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'userData',
        required:true,
        trim:true
    },
    products:[{
        productId:{
            type:Schema.Types.ObjectId,
            ref:'products',
            required:true,
            trim:true,
        }
    }]
})


export const wishlistCollection = wishlistModel('wishlist',wishlistSchema)