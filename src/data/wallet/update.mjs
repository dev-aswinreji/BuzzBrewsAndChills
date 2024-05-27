import { walletCollection } from "../../model/wallet.mjs";


export async function updateUserWallet (userId,walletAmount){
    return await walletCollection.updateOne({userId:userId},{$set:{walletAmount:walletAmount}},{upsert:true})
}