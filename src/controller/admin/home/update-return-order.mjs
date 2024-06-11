import { findUniqueOrderToChangeReturnOrderStatus } from "../../../data/order/find.mjs";
import { updateUserWallet } from "../../../data/wallet/update.mjs";


export const admin_orderReturnUpdatingGet = async (req, res) => {
    try {
        const { orderId } = req.query
        console.log(orderId, 'order id is showing');
        const orderDetails = await findUniqueOrderToChangeReturnOrderStatus(orderId)
        console.log(orderDetails, 'order details is showing');
        res.render('return-order-details', { orderDetails })

    } catch (error) {
        console.log(error, 'ADMIN ORDER RETURN UPDATING GET');
    }
}

export const admin_orderReturnConfirmationPut = async (req, res) => {
    try {
        const { orderId, productId, userId, action, totalPrice } = req.body
        if (action === 'APPROVED') {
            const update = {
                $set: { "products.$[elem].status": 'APPROVED' }
            };
            const options = {
                arrayFilters: [{ "elem.productId": productId }],
                new: true
            };
            const result = await returnOrderStatusUpdate(orderId, update, options)
            console.log(result, 'result is showing');
            const walletTransactions = {
                date: new Date(),
                type: 'CREDIT',
                amount: totalPrice.toFixed(2),
            }
            const updateWallet = await updateUserWallet(userId, totalPrice, walletTransactions)
            console.log(updateWallet, 'wallet update or not ');


            let updateProductStock = Number(product.stock) + Number(quantity);

            await updateProducts(productId, { stock: updateProductStock })
            res.json({ result: 'APPROVED' })
        } else if (action === 'REJECTED') {
            const update = {
                $set: { "products.$[elem].status": 'REJECTED' }
            };
            const options = {
                arrayFilters: [{ "elem.productId": productId }],
                new: true
            };
            const result = await returnOrderStatusUpdate(orderId, update, options)
            res.json({ result: 'REJECTED' })
        }

    } catch (error) {
        console.log(error, 'ADMIN ORDER RETURN CONFIRMATION GET PUT ERROR');
    }
}