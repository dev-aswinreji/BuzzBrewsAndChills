import { cartCollection } from "../../model/cart.mjs";
import { orderCollection } from "../../model/order.mjs";
import { otpGenForNewUser } from "../../utils/otp-generator.mjs";
import { findCartDataUsingUserId } from "../cart/find.mjs";
import { findUserAddressUsingId } from "../users/find.mjs";

export async function insertOrder(userId, userAddressId, paymentMethod) {
  const address = await findUserAddressUsingId(userAddressId);

  const cart = await findCartDataUsingUserId(userId);
  const orderId = await otpGenForNewUser()
  console.log(cart,'cart data is ');
  console.log(orderId,'order id is working');
  if (cart.items.length > 0) {
    const order = await orderCollection.insertMany([
      { userId: userId, 
        orderId:orderId,
        items: cart.items.map((item) => ({
          productId: item.productId._id,
          quantity: item.quantity,
          price: item.productId.price,
        })),
        totalPrice: cart.totalPrice,
        address: address,
        paymentMethod: paymentMethod,
      }]
    );
      console.log(order,'is order is working================================================================');
    await cartCollection.updateOne(
      { userId: userId },
      { $set: { items: [] }, totalPrice: 0 }
    );
  }
  console.log(cart, "what is cart");
}
