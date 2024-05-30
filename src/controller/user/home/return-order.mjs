
import { findOrderData, findSingleOrder, findUniqueOrderToChangeOrderStatus } from "../../../data/order/find.mjs";
import {  updateReturnedProduct } from "../../../data/order/update.mjs";
import { findSingleProduct } from "../../../data/products/find.mjs";
import { updateProducts } from "../../../data/products/update.mjs";
import { updateCouponInUserData, updateCouponInUserDataReturnAndCancel } from "../../../data/users/update.mjs";
import { updateUserWallet } from "../../../data/wallet/update.mjs";

export const user_returnOrderGet = async (req,res)=>{
    // const productId = req.query.productId
    // const quantity = req.query.quantity
    // const orderId = req.query.orderId
    try {
        console.log(req.query,'query is showing');
        const productId = req.query.productId;
        const userId = req.session.USER_ID
        const product = await findSingleProduct(productId);
        const quantity = req.query.quantity;
        const orderId = req.query.orderId;
        const orderDetail = await findSingleOrder(orderId)
        console.log(orderDetail,'order detail is showing');
        const couponCode = orderDetail.couponCode
        console.log(couponCode,'coupon code is showing');
        const totalPrice = orderDetail.totalPrice
        console.log(totalPrice,'total price is showing');
        console.log(userId,'');
          const walletTransactions = {
            date:new Date(),
            type:'CREDIT',
            amount:totalPrice.toFixed(2),
          }
         const updateWallet = await updateUserWallet(userId,totalPrice,walletTransactions)
         console.log(updateWallet,'wallet updated successfulyyyyyy');
        let updateProductStock = Number(product.stock) + Number(quantity);
        
        const result = await updateReturnedProduct(orderId,productId);
        const userCouponRemove = await updateCouponInUserDataReturnAndCancel(userId,couponCode)
        console.log(userCouponRemove,'coupon remove form user data is success');
        const response =
          result === "Success"
            ? await updateProducts(productId, { stock: updateProductStock }).then(
                () => ({ result: "success" ,status:'RETURNED' })
              )
            : { result: "fail" };
    
        res.json(response);
      } catch (error) {
        console.log(error, "USER CANCEL ORDER GET ");
      }
}