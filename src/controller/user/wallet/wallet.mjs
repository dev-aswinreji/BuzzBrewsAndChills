import { findWalletAmount } from "../../../data/wallet/find.mjs"


export const user_walletGet = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 6; // Number of transactions per page

        const userId = req.session.USER_ID
        const wallet = await findWalletAmount(userId)
       
        const totalTransactions = wallet.walletTransactions.length;
        const totalPages = Math.ceil(totalTransactions / limit);

        const transactions = wallet.walletTransactions
            .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date descending
            .slice((page - 1) * limit, page * limit); // Paginate

        res.render('wallet', {
            wallet,
            transactions,
            currentPage: parseInt(page),
            totalPages
        });
    } catch (error) {
        console.log(error, 'USER WALLET GET ');
    }

}