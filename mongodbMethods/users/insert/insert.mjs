
import { userAddressCollection } from "../../../model/userAddress.mjs";
import { userCollection } from "../../../model/userdata.mjs";

export async function insertUser(data) {
    await userCollection.insertMany([data])
}

export async function insertUserAddress(user,data) {
    await userAddressCollection.insertMany([data])
}