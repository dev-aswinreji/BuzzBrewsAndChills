import { userAddressCollection } from "../../model/userAddress.mjs";


export async function deleteUserAddress (addressId){
    return await userAddressCollection.findByIdAndDelete(addressId)
}