

export const user_walletGet = async (req,res)=>{
    const walletBalance = 1000
    res.render('wallet',{walletBalance})
}