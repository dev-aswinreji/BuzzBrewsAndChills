import { userCollection } from "../../model/userData.mjs";


export async function findAdmin(data) {
    return await userCollection.findOne({ email: data, role: "ADMIN" })
}


export async function findAllUser(skip,limit) {
    return await userCollection.find({ role: "USER"}).skip(skip).limit(limit)
}


export async function findTotalCountOfAllUsersForAdmin (){
    return await userCollection.countDocuments()
}