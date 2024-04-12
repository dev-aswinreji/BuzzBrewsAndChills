import { userCollection } from "../../model/userData.mjs"
import { userAddressCollection } from "../../model/userAddress.mjs"
import { googleCollection } from "../../model/signin-with-google.mjs"


export async function insertUser(data) {
    return await userCollection.create([data])
}

export async function insertUserAddress(data) {
    return await userAddressCollection.create([data])
}


export async function insertGoogle(data){
    return await googleCollection.create([data])
}