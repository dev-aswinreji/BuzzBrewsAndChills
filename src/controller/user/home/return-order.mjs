
import { findOrderData, findSingleOrder, findUniqueOrderToChangeOrderStatus } from "../../../data/order/find.mjs";
import {  updateReturnedProduct, updateReturnedProductStatus } from "../../../data/order/update.mjs";
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
        const userId = req.session.USER_ID
        const orderId = req.query.orderId;
        const returnReason = req.query.returnReason
        console.log(returnReason,'return reason is showing===========================');
        
        const result = await updateReturnedProductStatus(userId,orderId,returnReason);
        console.log(result,'result');
        res.json({result:'success'})
        
      } catch (error) {
        console.log(error, "USER CANCEL ORDER GET ");
      }
}