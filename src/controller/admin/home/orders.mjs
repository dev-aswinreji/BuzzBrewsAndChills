import { findAllOrderDataForAdmin } from "../../../data/order/find.mjs";

export const admin_ordersGet = async (req, res) => {
  try {
    const orders = await findAllOrderDataForAdmin()
    console.log(orders,'orders is showing');
    res.render("orders",{orders});
  } catch (error) {
    console.error(error, " ADMIN ORDERS GET ");
  }
};
