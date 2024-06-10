const walletTransactions = {
    date: new Date(),
    type: 'CREDIT',
    amount: totalPrice.toFixed(2),
}
const updateWallet = await updateUserWallet(userId, totalPrice, walletTransactions)
console.log(updateWallet, 'wallet updated successfulyyyyyy');
let updateProductStock = Number(product.stock) + Number(quantity);

console.log(userCouponRemove, 'coupon remove form user data is success');
const response =
    result === "Success"
        ? await updateProducts(productId, { stock: updateProductStock }).then(
            () => ({ result: "success", status: 'RETURNED' })
        )
        : { result: "fail" }


const userCouponRemove = await updateCouponInUserDataReturnAndCancel(userId, couponCode)





const orderDetail = await findSingleOrder(orderId)
console.log(orderDetail,'order detail is showing');
const couponCode = orderDetail.couponCode
console.log(couponCode,'coupon code is showing');
const totalPrice = orderDetail.totalPrice
console.log(totalPrice,'total price is showing');
console.log(userId,'');
