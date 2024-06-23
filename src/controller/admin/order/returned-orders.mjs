import { findAllReturnedOrders, findAllReturnedOrdersCount } from "../../../data/order/find.mjs"


export const admin_returnedOrdersGet = async (req, res) => {
    try {
        const limit = 6;
        let page = Number(req.query.page) || 1;

        const TOTAL_COUNT_OF_ORDERS = await findAllReturnedOrdersCount();
        const totalPages = Math.ceil(TOTAL_COUNT_OF_ORDERS / limit);
        console.log(TOTAL_COUNT_OF_ORDERS, 'total count is showing');
        page = Math.max(1, Math.min(page, totalPages));

        const skip = (page - 1) * limit;
        const orders = await findAllReturnedOrders(skip,limit)
        res.render('returned-orders', { orders ,page,totalPages,count:TOTAL_COUNT_OF_ORDERS})
    } catch (error) {
        console.log(error, 'RETURN ORDERS GET ERROR');
    }
}