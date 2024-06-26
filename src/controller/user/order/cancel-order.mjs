import { findOrderData, findSingleOrder, findUniqueOrderToChangeOrderStatus } from "../../../data/order/find.mjs";
import { updateCancelProduct } from "../../../data/order/update.mjs";
import { findSingleProduct } from "../../../data/products/find.mjs";
import { updateProducts } from "../../../data/products/update.mjs";
import { updateCouponInUserDataReturnAndCancel } from "../../../data/users/update.mjs";
import { updateUserWallet } from "../../../data/wallet/update.mjs";

export const user_cancelOrderGet = async (req, res) => {
  try {
    console.log(req.query, 'query is showing');
    const productId = req.query.productId;
    const userId = req.session.USER_ID
    const product = await findSingleProduct(productId);
    const quantity = req.query.quantity;
    const orderId = req.query.orderId;
    const orderDetail = await findSingleOrder(orderId)
    console.log(orderDetail, 'order detail is showing===============================================================');
    // const returnedProductPrice = orderDetail.products.filter(product => product.productId.equals(product._id) ? product.price : 0)
    const returnedProduct = orderDetail.products.filter(product =>product.productId === productId)
    console.log(returnedProduct,'returned product is showing =========                                ============================ kkkkkkkkkkkkkkkkkkkkkkkkk=====================');
    const returnedProductPrice = returnedProduct[0].price * returnedProduct[0].quantity
    console.log(returnedProductPrice,'returned product is showing ============================4444444444444450000000000000');
    const couponCode = orderDetail.couponCode
    console.log(couponCode, 'coupon code is showing');
    const paymentMethod = orderDetail.paymentMethod
    console.log(paymentMethod);
    console.log(userId, '');
    if (paymentMethod === 'Online Payment' || paymentMethod === 'Wallet' || paymentMethod === 'cash on delivery' && returnedProduct.status === 'DELIVERED')  {
      const walletTransactions = {
        date: new Date(),
        type: 'CREDIT',
        amount: returnedProductPrice.toFixed(2),
      }
      const updateWallet = await updateUserWallet(userId, returnedProductPrice, walletTransactions)
      console.log(updateWallet, 'wallet updated successfulyyyyyy');
    }
    let updateProductStock = Number(product.stock) + Number(quantity);

    const result = await updateCancelProduct(orderId, productId);

    const response =
      result === "Success"
        ? await updateProducts(productId, { stock: updateProductStock }).then(
          () => ({ result: "success", status: 'CANCELLED' })
        )
        : { result: "fail" };

    res.json(response);
  } catch (error) {
    console.log(error, "USER CANCEL ORDER GET ");
  }
};
