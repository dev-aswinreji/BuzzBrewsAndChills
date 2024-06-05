import moment from "moment";
import mongoose, { Schema } from "mongoose";

const db = await import("./database.mjs").then((instance) => instance.default);

function orderModel(collectionName, schema) {
  return db.model(collectionName, schema);
}

function getFormattedDate() {
  const now = new Date();
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0'); // Hours in 24-hour format
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${day}${month}${year}${hours}${minutes}${seconds}`;
}
const orderSchema = mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    trim: true,
    required: true,
  },
  orderId: {
    type: String,
    trim: true,
    required: true,
  },
  products: [
    {
      productId: {
        type: String,
        required: true
      },
      status: {
        type: String,
        enum: ["ORDER PLACED", "PROCESSING", "OUT FOR DELIVERY", "DELIVERED", "CANCELLED"],
        default: "ORDER PLACED",
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
      discount_price: {
        type: Number
      }
    },
  ],
  address: {
    type: Object,
    required: true,
  },
  originalPrice: {
    type: Number,
    min: 0,
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
    type: Date,
    default: new Date(),
  },
  onlinePaymentId: {
    type: String,
  },
  timeStamp: {
    type: String,
    default: getFormattedDate,
  },
  couponDiscount: {
    type: Number,
  },
  couponCode: {
    type: String
  }
});

export const orderCollection = orderModel("order", orderSchema);
