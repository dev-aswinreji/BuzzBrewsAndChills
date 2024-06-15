import { ObjectId } from "mongodb";
import { aggregationForTotalPrice } from "../../../data/cart/aggregation.mjs";
import { findAllCartDatas } from "../../../data/cart/find.mjs";
import { cartCollection } from "../../../model/cart.mjs";

export const user_cartGet = async (req, res) => {
  const userId = req.session.USER_ID;
  console.log(req.session.applyCoupon, 'what is this');
  const totalPrice = await aggregationForTotalPrice(userId);
  console.log(totalPrice, "aggregation is working ====================");
  if (totalPrice.length > 0) {
    await cartCollection.updateOne(
      {
        userId: userId,
      },
      { totalPrice: totalPrice[0].totalPrice }
    );
  } else {
    await cartCollection.updateOne(
      {
        userId: userId,
      },
      { totalPrice: 0 }
    );
  }


  const cart = await findAllCartDatas(userId);
  console.log(cart, "cart data is shwoing");
  res.render("cart", { cart });
};
