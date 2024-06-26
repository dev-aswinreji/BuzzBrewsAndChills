import { userAddressCollection } from "../../model/userAddress.mjs";
import { userCollection } from "../../model/userData.mjs";

export async function updateUser(data, addressOfUser) {
  return await userCollection.updateOne(
    {
      email: data,
    },
    {
      $addToSet: {
        addresses: addressOfUser,
      },
    }
  );
}

export async function updateUserUsingIdForAddress(userId, addressOfUser) {
  return await userCollection.findByIdAndUpdate(userId, {
    $addToSet: {
      addresses: addressOfUser,
    },
  });
}
export async function updateUserUsingId(userId, userData) {
  return await userCollection.findByIdAndUpdate(userId, userData);
}

export async function updateUserPassword(userEmail, newPassword) {
  const updated = await userCollection.updateOne(
    {
      email: userEmail,
    },
    {
      $set: {
        password: newPassword,
      },
    }
  );
  console.log(updated);
}

export async function updateUserPasswordUsingId(id, newPassword) {
  return await userCollection.findByIdAndUpdate(id, { password: newPassword });
}

export async function updateUserAddressUsingId(id, userData) {
  return await userAddressCollection.findByIdAndUpdate(id, userData);
}

export async function updateMakeDefaultUserAddress(addressId) {
   await userAddressCollection.findByIdAndUpdate(addressId, {
    isDefault: "YES",
  });
  return await userAddressCollection.updateOne(
    {
      isDefault: "YES",
      _id: {
        $ne: addressId,
      },
    },
    { isDefault: "NO" }
  );
}

export async function updateCouponInUserData (userId,couponCode){
  return await userCollection.findByIdAndUpdate(userId,{$push:{coupon:couponCode}})
}


export async function updateCouponInUserDataReturnAndCancel(userId,couponCode){
  return await userCollection.findByIdAndUpdate(userId,{$pull:{coupon:couponCode}})
}