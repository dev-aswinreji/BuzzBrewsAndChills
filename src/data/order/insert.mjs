import { cartCollection } from "../../model/cart.mjs";
import { orderCollection } from "../../model/order.mjs";
import { otpGenForForgotPassword } from "../../utils/otp-generator.mjs";
import { findCartDataUsingUserId } from "../cart/find.mjs";
import { findUserAddressUsingId } from "../users/find.mjs";
import { updateProductStockInOrder } from "./update.mjs";

export async function insertOrder(userId, userAddressId, paymentMethod,paymentId) {
  try {

    const address = await findUserAddressUsingId(userAddressId);
  console.log(address,'address is showing ');
  const cart = await findCartDataUsingUserId(userId);
  const orderId = await otpGenForForgotPassword();
  const cartItems = cart.items.filter(item=>item.productId.stock.toString() <= item.quantity.toString() )
  console.log(cartItems,'cartItems is working');
  console.log(cart, "cart data is ");
  console.log(orderId, "order id is working");
  if (cart.items.length > 0) {
    const order = await orderCollection.create([
      {
        username: address.name,
        orderId: orderId,
        products: cart.items.map((item) => ({
          productId: item.productId._id,
          name:item.productId.name,
          quantity: item.quantity,
          price: item.productId.price,
        })),
        totalPrice: cart.totalPrice,
        address: address.homeAddress,
        paymentMethod: paymentMethod,
        paymentId:paymentId
      },
    ]);
    console.log(order,'order is showing success or not ================================================================================================');

    await cartCollection.deleteOne({ _id: cart._id });

    await updateProductStockInOrder(order);
    return order
  }
  console.log(cart, "what is cart");
    
  } catch (error) {
    console.log(error,'Insert order func ');
  }
  
}
