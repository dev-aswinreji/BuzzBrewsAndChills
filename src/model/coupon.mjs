import mongoose from "mongoose";

const db = await import("./database.mjs").then((instance) => instance.default);

function couponModel(collectionName, schema) {
  return db.model(collectionName, schema);
}

const couponSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  discount:{
    type:Number,
    required:true
  },
  starting_date:{
    type:Date,
    required:true
  },
  ending_date:{
    type:Date,
    required:true
  },
  minimum_cart_price:{
    type:Number,
    required:true
  },
  once_per_user:{
    type:String,
    enum:['USED','NOT USED'],
    default:'NOT USED'
  }
});

export const couponCollection = couponModel('coupon',couponSchema)