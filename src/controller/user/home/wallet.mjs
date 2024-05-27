import { findWalletAmount } from "../../../data/wallet/find.mjs"


export const user_walletGet = async (req,res)=>{
    const userId = req.session.USER_ID
    const wallet = await findWalletAmount(userId)
    console.log(wallet,'wallet is showing');
    res.render('wallet',{wallet})
}