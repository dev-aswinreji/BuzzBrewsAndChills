import { googleCollection } from "../../model/signin-with-google.mjs";
import { userAddressCollection } from "../../model/userAddress.mjs";
import { userCollection } from "../../model/userData.mjs";

export async function findUser (data){
    return await userCollection.findOne({email:data})
}

export async function findUserAddress(data){
    return await userAddressCollection.findOne({home_address:data})
}

export async function findUserAddressUsingPopulate(data) {
    return await userCollection.findOne({email:data}).populate('addresses')
}

export async function findSigninWithGoogleUser (data){
    return await googleCollection.findOne({googleId:data})
}