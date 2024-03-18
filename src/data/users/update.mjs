// import { Schema } from "mongoose";

import { userCollection } from "../../model/user-entities/userData.mjs";

// export async function updateUser(data) {

//     userCollection.updateMany(
//         { email: data },
//         {
//             $addToSet:
//             {
//                 $addressId: [
//                     { type: Schema.Types.ObjectId, ref: 'userAddressData' }
//                 ]
//             }
//         })
// }

export async function updateUserPassword (userEmail,newPassword) {
    const updated = await userCollection.updateOne({email:userEmail},{$set:{password:newPassword}})
    console.log(updated)
}