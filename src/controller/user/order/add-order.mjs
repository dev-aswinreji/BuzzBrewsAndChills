import { insertOrder } from "../../../data/order/insert.mjs";

export const user_orderAddGet = async (req, res) => {
  try {
    // const userAddress = req.session.USER_ORDER_DEFAULT_ADDRESSID;

    const userId = req.session.USER_ID;
    const paymentMethod = req.query.paymentMethod;
    const paymentId = req.query.paymentId
    const address = req.query.address
    const couponDiscount = req.query.couponDiscount || 0
    console.log(paymentMethod,'payment method');
    console.log(paymentId,'payment id is showing');
    console.log(address,'address is showing');
    console.log(couponDiscount,'coupon discount is showing');

    const order = await insertOrder(userId, address, paymentMethod,paymentId,couponDiscount);

    

    req.session.ORDER_PLACED = order
    console.log(order,'order of that product is showing ');
    res.json({ result: "success" });
  } catch (error) {
    console.log(error, "USER ORDER ADD GET");
  }
};