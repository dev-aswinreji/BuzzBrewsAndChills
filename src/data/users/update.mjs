

import { userCollection } from "../../model/userData.mjs";

export async function updateUser(data, addressOfUser) {

    return await userCollection.updateOne({ email: data }, { $addToSet: { addresses: addressOfUser} })
}

export async function updateUserPassword(userEmail, newPassword) {
    const updated = await userCollection.updateOne({ email: userEmail }, { $set: { password: newPassword } })
    console.log(updated)
}
