import { userCollection } from "../../model/userData.mjs";


export async function findAdmin(data) {
    return await userCollection.findOne({ email: data, role: "ADMIN" })
}


export async function findAllUser() {
    return await userCollection.find({ role: "USER"})
}


