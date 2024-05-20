import { findUniqueOrderToChangeOrderStatus } from "../../../data/order/find.mjs";
import { updateOrderedProduct } from "../../../data/order/update.mjs";

export const admin_orderDetailsGet = async (req, res) => {
  const orderId = req.query.orderId;
  const orderDetails = await findUniqueOrderToChangeOrderStatus(orderId);
  console.log(orderDetails, "order details is showing");
  res.render("order-details", { orderDetails });
};

export const admin_orderDetailsPost = async (req, res) => {
  console.log(req.body, "req.body is showing");

  const orderId = req.body.orderId;
  const status = req.body.status;
  const productId = req.body.productId;

  await updateOrderedProduct(orderId,productId,status);
  console.log('', "order details is showing");
};
