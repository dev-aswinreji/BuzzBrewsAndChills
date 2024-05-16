import moment from "moment";
import mongoose, { Schema } from "mongoose";

const db = await import("./database.mjs").then((instance) => instance.default);

function cartModel(collectionName, schema) {
  return db.model(collectionName, schema);
}

const orderSchema = mongoose.Schema({
  userId: {
    type:Schema.Types.ObjectId,
    trim:true,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  products: {
    type:Array,
    required: true,
  },
  address:{
    type:String,
    required:true,  
  },
  totalPrice: {
    type: Number,
    min: 0,
    required: true,
  },
  status: {
    type: String,
    enum: ["PROCESSING", "OUT FOR DELIHVERY", "DELIVERED","CANCELLED"],
    default: "PROCESSING",
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  orderDate: {
    type: String,
    default: moment().format("YYYY/MM/DD"),
  },
  onlinePaymentId: {
    type: String,
  },
});

export const orderCollection = cartModel("order", orderSchema);
