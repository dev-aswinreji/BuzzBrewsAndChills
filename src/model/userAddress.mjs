import mongoose, {Schema} from "mongoose";
const db = await import ("./database.mjs").then((instance) => instance.default);

function userModel(collectionName, schema) {
    return db.model(collectionName, schema);
}
const userAddressSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    homeAddress: {
        type: String,
        requied: true
    },
    city: {
        type: String,
        requied: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        requied: true
    },
    isDefault: {
        type: String,
        enum: [
            "YES", "NO"
        ],
        default: "NO"
    }
});

export const userAddressCollection = userModel("userAddressData", userAddressSchema);
