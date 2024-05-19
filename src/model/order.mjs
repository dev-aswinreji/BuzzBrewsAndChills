import moment from "moment";
import mongoose, { Schema } from "mongoose";

const db = await import("./database.mjs").then((instance) => instance.default);

function cartModel(collectionName, schema) {
  return db.model(collectionName, schema);
}

const orderSchema = mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  products: [
    {
      productId:{
        type:String,
        required:true
      },
      status: {
        type: String,
        enum: ["PROCESSING", "OUT FOR DELIHVERY", "DELIVERED", "CANCELLED"],
        default: "PROCESSING",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  address: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    min: 0,
    required: true,
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
