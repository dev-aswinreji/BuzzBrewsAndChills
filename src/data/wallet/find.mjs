import { walletCollection } from "../../model/wallet.mjs";

export async function findWalletAmount(userId){
    return await walletCollection.findOne({userId,userId})
}