import { walletCollection } from "../../model/wallet.mjs";


export async function updateUserWallet (userId,walletAmount,walletTransactions){
        return await walletCollection.updateOne({userId:userId},{$inc:{walletAmount:+walletAmount},$addToSet:{walletTransactions:walletTransactions}},{upsert:true})
}