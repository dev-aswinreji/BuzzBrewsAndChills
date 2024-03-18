import { userCollection } from "../../model/user-entities/userData.mjs";

export async function userData (data){
    return await userCollection.findOne({email:data})
}

