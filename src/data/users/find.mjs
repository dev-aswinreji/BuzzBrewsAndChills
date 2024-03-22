import { userAddressCollection } from "../../model/user-entities/userAddress.mjs";
import { userCollection } from "../../model/user-entities/userData.mjs";

export async function findUser (data){
    return await userCollection.findOne({email:data})
}

export async function findUserAddress(data){
    return await userAddressCollection.findOne({home_address:data})
}

export async function findUserAddressUsingPopulate(data) {
    return await userCollection.findOne({email:data}).populate('ownerId')
}