import { userAddressCollection } from "../../../model/userDatabase/userAddress.mjs"
import { userCollection } from "../../../model/userDatabase/userdata.mjs"


export async function insertUser(data) {
    await userCollection.create([data])
}

export async function insertUserAddress(data) {
    await userAddressCollection.create([data])
}

