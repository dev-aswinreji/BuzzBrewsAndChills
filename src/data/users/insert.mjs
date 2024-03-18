import { userCollection } from "../../model/user-entities/userData.mjs"
import { userAddressCollection } from "../../model/user-entities/userAddress.mjs"


export async function insertUser(data) {
    await userCollection.create([data])
}

export async function insertUserAddress(data) {
    await userAddressCollection.create([data])
}

