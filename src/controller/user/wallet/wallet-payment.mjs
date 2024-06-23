import { updateUserWalletPurchaseProduct } from "../../../data/wallet/update.mjs";


export const user_walletPaymentGet = async (req,res)=>{
   try {
    const userId = req.session.USER_ID
    const totalPrice = Number(req.query.totalPrice)
    console.log(totalPrice,'total price is showing');
    const walletTransactions = {
        date:new Date(),
        type:'DEBIT',
        amount:totalPrice.toFixed(2),
      }
     const updateWallet = await updateUserWalletPurchaseProduct(userId,totalPrice,walletTransactions)
     console.log(updateWallet,'wallet updated success');
     res.json({result:'success'})
   } catch (error) {
    console.log(error,'USER WALLET PAYMENT GET ')
   }
}