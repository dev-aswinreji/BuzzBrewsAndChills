import { findAllOrderDataForAdmin, findTotalCountOfAllOrdersForAdmin } from "../../../data/order/find.mjs";

export const admin_ordersGet = async (req, res) => {
  try {

    const limit = 6; 
    let page = Number(req.query.page) || 1; 
        
    const TOTAL_COUNT_OF_ORDERS = await findTotalCountOfAllOrdersForAdmin();
    const totalPages = Math.ceil(TOTAL_COUNT_OF_ORDERS / limit);
    page = Math.max(1, Math.min(page, totalPages));

    const skip = (page - 1) * limit;
   
    const orders = await findAllOrderDataForAdmin(skip,limit)
    res.render("orders",{orders, page,totalPages, count: TOTAL_COUNT_OF_ORDERS});
  } catch (error) {
    console.error(error, " ADMIN ORDERS GET ");
  }
};
