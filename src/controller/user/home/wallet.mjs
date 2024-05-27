import { findWalletAmount } from "../../../data/wallet/find.mjs"


export const user_walletGet = async (req,res)=>{
    try {
        const userId = req.session.USER_ID
        const wallet = await findWalletAmount(userId)
        console.log(wallet,'wallet is showing');
        res.render('wallet',{wallet})
    } catch (error) {
        console.log(error,'USER WALLET GET ');
    }
  
}