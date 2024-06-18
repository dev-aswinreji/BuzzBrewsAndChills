import { v4 as uuid } from "uuid";
import { cartCollection } from "../../model/cart.mjs";
import { orderCollection } from "../../model/order.mjs";
import { otpGenForForgotPassword } from "../../utils/otp-generator.mjs";
import { findCartDataUsingUserId } from "../cart/find.mjs";
import { findUserAddressUsingId } from "../users/find.mjs";
import { updateCouponInUserData } from "../users/update.mjs";
import { updateProductStockInOrder } from "./update.mjs";
import { orderIdGenerator } from "../../utils/orderId-generator.mjs";

export async function insertOrder(userId, userAddressId, paymentMethod, paymentId, couponDiscount) {
  try {

    const address = await findUserAddressUsingId(userAddressId);
    console.log(address, 'address is showing ');
    const cart = await findCartDataUsingUserId(userId);
    const orderId = await orderIdGenerator()  //generating unique id for order id 
    const cartItems = cart.items.filter(item => item.productId.stock.toString() <= item.quantity.toString())
    const couponCode = cart.couponCode

    console.log(couponCode, 'coupon code is showing rn');
    console.log(cartItems, 'cartItems is working');
    console.log(cart, "cart data is ");
    console.log(orderId, "order id is working");
    const originalPrice = cart.items.reduce((total, item) => {
      return total + (item.productId.discount_price * item.quantity);
    }, 0);
    // const price = cart.items.map(data=>{
    //    return data.productId.discount_price = data.productId.discount_price - (data.productId.discount_price * couponDiscount/100)
    //    console.log(data.productId.price,'wowwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww');
    // })
    // console.log(price,'price is showing','[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[-------------------------------');
    console.log(originalPrice, 'original price is showing');
    if (cart.items.length > 0) {
      const order = await orderCollection.create([
        {
          userId: userId,
          orderId: orderId,
          products: cart.items.map((item) => ({
            productId: item.productId._id,
            name: item.productId.name,
            quantity: item.quantity,
            originalProductPrice:item.productId.discount_price,
            price: item.productId.discount_price = item.productId.discount_price - (item.productId.discount_price * couponDiscount/100),
          })),
          totalPrice: cart.totalPrice,
          originalPrice:originalPrice,
          address: address,
          paymentMethod: paymentMethod,
          paymentId: paymentId,
          couponDiscount: couponDiscount,
          couponCode: couponCode,
        },
      ]);
      console.log(order, 'order is showing success or not ================================================================================================');

      await cartCollection.deleteOne({ _id: cart._id });

      await updateProductStockInOrder(order);
      const userDataUpdated = await updateCouponInUserData(userId, couponCode)
      console.log(userDataUpdated, 'update coupon to user Data');
      return order
    }
    console.log(cart, "what is cart");

  } catch (error) {
    console.log(error, 'Insert order func ');
  }

}


export async function paymentFailedCreateOrder(userId, userAddressId, paymentMethod, paymentId, couponDiscount){
  const address = await findUserAddressUsingId(userAddressId);
    console.log(address, 'address is showing ');
    const cart = await findCartDataUsingUserId(userId);
    const orderId = await orderIdGenerator()  //generating unique id for order id 
    const cartItems = cart.items.filter(item => item.productId.stock.toString() <= item.quantity.toString())
    const couponCode = cart.couponCode

    console.log(couponCode, 'coupon code is showing rn');
    console.log(cartItems, 'cartItems is working');
    console.log(cart, "cart data is ");
    console.log(orderId, "order id is working");
    const originalPrice = cart.items.reduce((total, item) => {
      return total + (item.productId.discount_price * item.quantity);
    }, 0);
    // const price = cart.items.map(data=>{
    //    return data.productId.discount_price = data.productId.discount_price - (data.productId.discount_price * couponDiscount/100)
    //    console.log(data.productId.price,'wowwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww');
    // })
    // console.log(price,'price is showing','[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[-------------------------------');
    console.log(originalPrice, 'original price is showing');
    if (cart.items.length > 0) {
      const order = await orderCollection.create([
        {
          userId: userId,
          orderId: orderId,
          products: cart.items.map((item) => ({
            productId: item.productId._id,
            name: item.productId.name,
            quantity: item.quantity,
            status:"PENDING",
            originalProductPrice:item.productId.discount_price,
            price: item.productId.discount_price = item.productId.discount_price - (item.productId.discount_price * couponDiscount/100),
          })),
          totalPrice: cart.totalPrice,
          originalPrice:originalPrice,
          address: address,
          paymentMethod: paymentMethod,
          paymentId: paymentId,
          paymentStatus:'FAILURE',
          couponDiscount: couponDiscount,
          couponCode: couponCode,
        },
      ]);
      console.log(order, 'order is showing success or not ================================================================================================');

      await cartCollection.deleteOne({ _id: cart._id });

      const userDataUpdated = await updateCouponInUserData(userId, couponCode)
      console.log(userDataUpdated, 'update coupon to user Data');
      return order
    }
}