import { findOrderData, findOrderDataCount } from "../../../data/order/find.mjs";
import { orderCollection } from "../../../model/order.mjs";


export const user_orderListGet = async (req, res) => {
  try {
    const userId = req.session.USER_ID
    const page = parseInt(req.query.page) || 1;
    const limit = 6; // Number of transactions per page
    console.log(userId, 'userId is showing');
    const skip = (page - 1) * limit;
    const order = await findOrderData(userId,skip,limit);
    const totalOrders = await findOrderDataCount(userId) / limit
    console.log(totalOrders,'total orders is showing');
    console.log(order, 'order history of specific user');
    res.render("order-history", { order,currentPage:parseInt(page) ,totalOrders});
  } catch (error) {
    console.log(error, "USER ORDER GET");
  }
};
