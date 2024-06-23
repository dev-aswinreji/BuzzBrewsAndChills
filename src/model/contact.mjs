
import mongoose from "mongoose";

const db = await import("./database.mjs").then((instance) => instance.default);

function contactModel(collectionName, schema) {
  return db.model(collectionName, schema);
}


const contactSchema = new mongoose.Schema({
   
    name: {
      type: String,
    
    },
  
    email: {
      type: String,
    
    },
  
    phoneNumber: {
      type: Number,
    
    },
  
    subject: {
      type: String,
    
    },
  
    message: {
      type: String,
    
    },
  
    createdAt:{
      type:Date,
      default:Date.now()
    }
  });
  
  
  export const contactCollection = contactModel('contact',contactSchema)  