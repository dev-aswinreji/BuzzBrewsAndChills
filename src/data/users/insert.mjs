import { userCollection } from "../../model/userData.mjs"
import { userAddressCollection } from "../../model/userAddress.mjs"


export async function insertUser(data) {
    await userCollection.create([data])
}

export async function insertUserAddress(data) {
    return await userAddressCollection.create([data])
}

