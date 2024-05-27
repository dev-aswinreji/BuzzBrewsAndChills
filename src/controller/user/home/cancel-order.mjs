import { findOrderData, findSingleOrder, findUniqueOrderToChangeOrderStatus } from "../../../data/order/find.mjs";
import { updateCancelProduct } from "../../../data/order/update.mjs";
import { findSingleProduct } from "../../../data/products/find.mjs";
import { updateProducts } from "../../../data/products/update.mjs";
import { updateUserWallet } from "../../../data/wallet/update.mjs";

export const user_cancelOrderGet = async (req, res) => {
  try {
    console.log(req.query,'query is showing');
    const productId = req.query.productId;
    const userId = req.session.USER_ID
    const product = await findSingleProduct(productId);
    const quantity = req.query.quantity;
    const orderId = req.query.orderId;
    const orderDetail = await findSingleOrder(orderId)
    console.log(orderDetail,'order detail is showing');
    const paymentMethod = orderDetail.paymentMethod
    const totalPrice = orderDetail.totalPrice
    console.log(totalPrice,'total price is showing');
    console.log(paymentMethod);
    console.log(userId,'');
    if(paymentMethod === 'Online Payment' || 'Wallet'){
      const walletTransactions = {
        date:new Date(),
        type:'DEBIT',
        amount:totalPrice,
      }
     const updateWallet = await updateUserWallet(userId,totalPrice,walletTransactions)
     console.log(updateWallet,'wallet updated successfulyyyyyy');
    }
    let updateProductStock = Number(product.stock) + Number(quantity);

    const result = await updateCancelProduct(orderId,productId);

    const response =
      result === "Success"
        ? await updateProducts(productId, { stock: updateProductStock }).then(
            () => ({ result: "success" ,status:'CANCELLED' })
          )
        : { result: "fail" };

    res.json(response);
  } catch (error) {
    console.log(error, "USER CANCEL ORDER GET ");
  }
};
