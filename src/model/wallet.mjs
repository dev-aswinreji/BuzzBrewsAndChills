import mongoose from "mongoose";

const db = await import("./database.mjs").then((instance) => instance.default);

function walletModel(collectionName, schema) {
  return db.model(collectionName, schema);
}


const walletSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userData",
    },
    walletAmount: {
      type: Number,
      default: 0,
    },
    walletTransactions: [
      {
        date: { type: Date },
        type: { type: String },
        amount: { type: Number },
      },
    ],
  });
  
  export const walletCollection = walletModel('wallet',walletSchema)  