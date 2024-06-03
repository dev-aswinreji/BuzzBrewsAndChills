import mongoose from "mongoose";
const db = await import("./database.mjs").then((instance) => instance.default);
function userModel(collectionName, schema) { 
    return db.model(collectionName, schema);
}
let userAddressSchema;
try {

 userAddressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone number is required"],
        match: [/^\d{10}$/, "Phone number should be 10 digits long"]
    },
    homeAddress: {
        type: String,
        required: [true, "Home address is required"],
        trim: true
    },
    city: {
        type: String,
        required: [true, "City is required"],
        trim: true
    },
    state: {
        type: String,
        required: [true, "State is required"],
        trim: true
    },
    country: {
        type: String,
        required: [true, "Country is required"],
        trim: true
    },
    pincode: {
        type: String,
        required: [true, "Pincode is required"],
        match: [/^\d{6}$/, "Pincode should be 6 digits long"]
    },
    // isDefault: {
    //     type: String,
    //     enum: ["YES", "NO"],
    //     default: "NO"
    // }
}, {
    timestamps: true
})
} catch (error) {
    console.log(error,'USER ADDRESSS MODEL ERROR');
}
export const userAddressCollection = userModel("userAddressData", userAddressSchema);
