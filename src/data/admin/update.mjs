import { userCollection } from "../../model/userData.mjs";


export async function updateUserStatus (id,data){
    return await userCollection.findByIdAndUpdate(id,data)
}