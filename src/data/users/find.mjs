import { userCollection } from "../../model/user-entities/userData.mjs";

export async function findUser (data){
    return await userCollection.findOne({email:data})
}

