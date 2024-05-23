import { findOrderData } from "../../../data/order/find.mjs";
import { insertOrder } from "../../../data/order/insert.mjs";

export const user_orderAddGet = async (req, res) => {
  try {
    // const userAddress = req.session.USER_ORDER_DEFAULT_ADDRESSID;

    const userId = req.session.USER_ID;
    const paymentMethod = req.query.paymentMethod;
    const paymentId = req.query.paymentId
    const address = req.query.address
    console.log(paymentMethod,'payment method');
    console.log(paymentId,'payment id is showing');
    console.log(address,'address is showing');

    const order = await insertOrder(userId, address, paymentMethod,paymentId);


    req.session.ORDER_PLACED = order
    console.log(order,'order of that product is showing ');
    res.json({ result: "success" });
  } catch (error) {
    console.log(error, "USER ORDER ADD GET");
  }
};

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
