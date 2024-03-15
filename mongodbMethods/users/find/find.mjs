import { userCollection } from "../../../model/userDatabase/userdata.mjs";

export async function userData (data){
    return await userCollection.findOne({email:data})
}

