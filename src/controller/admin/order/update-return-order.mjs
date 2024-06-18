import { findSingleOrder, findUniqueOrderToChangeReturnOrderStatus, returnOrderStatusUpdate } from "../../../data/order/find.mjs";
import { findSingleProduct } from "../../../data/products/find.mjs";
import { updateProducts } from "../../../data/products/update.mjs";
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
        const { orderId, productId, userId, action, quantity } = req.body
        console.log(req.body);
        console.log(action, 'action');
        const orderDetails = await findSingleOrder(orderId)
        const product = await findSingleProduct(productId);
        if (action === 'APPROVE') {
            const update = {
                $set: { "products.$[elem].status": 'APPROVE' }
            };
            const options = {
                arrayFilters: [{ "elem.productId": productId }],
            }
            const result = await returnOrderStatusUpdate(orderId, update, options)
            console.log(result, 'result is showing approveddddd');



            let productPrice
            for (const product of orderDetails.products) {
                if( product.productId === productId){
                    productPrice = product.price * product.quantity 
                }
            }
            console.log(productPrice,'product price is showing');


            const walletTransactions = {
                date: new Date(),
                type: 'CREDIT',
                amount: productPrice.toFixed(2),
            }
            const updateWallet = await updateUserWallet(userId, productPrice, walletTransactions)
            console.log(updateWallet, 'wallet update or not ');


            let updateProductStock = Number(product.stock) + Number(quantity);

            await updateProducts(productId, { stock: updateProductStock })

            res.json({ result: 'APPROVE' })
        } else if (action === 'REJECT') {
            const update = {
                $set: { "products.$[elem].status": 'REJECT' }
            };
            const options = {
                arrayFilters: [{ "elem.productId": productId }],
            };
            const result = await returnOrderStatusUpdate(orderId, update, options)
            console.log(result, 'result is showing');
            res.json({ result: 'REJECT' })
        }

    } catch (error) {
        console.log(error, 'ADMIN ORDER RETURN CONFIRMATION GET PUT ERROR');
    }
}