// import { Schema } from "mongoose";
// import { userCollection } from "../../../model/userdata.mjs";

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