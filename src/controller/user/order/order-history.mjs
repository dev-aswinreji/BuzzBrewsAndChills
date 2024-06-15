import { findOrderData } from "../../../data/order/find.mjs";
import { orderCollection } from "../../../model/order.mjs";


export const user_orderListGet = async (req, res) => {
  try {
    const userId = req.session.USER_ID
    console.log(userId,'userId is showing');
    const order = await findOrderData(userId);
    console.log(order,'order history of specific user');
    res.render("order-history", { order });
  } catch (error) {
    console.log(error, "USER ORDER GET");
  }
};
