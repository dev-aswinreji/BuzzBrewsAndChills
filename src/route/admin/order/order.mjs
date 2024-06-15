import express from "express";

import { admin_authentication } from "../../../middleware/admin-auth.mjs";

import { admin_ordersGet } from "../../../controller/admin/order/orders.mjs";
import { admin_orderDetailsGet, admin_orderDetailsPost } from "../../../controller/admin/order/order-details.mjs";
import { admin_returnedOrdersGet } from "../../../controller/admin/order/returned-orders.mjs";
import { admin_orderReturnConfirmationPut, admin_orderReturnUpdatingGet } from "../../../controller/admin/order/update-return-order.mjs";

const orderAdminRoute = express.Router()

orderAdminRoute.get('/orders', admin_authentication, admin_ordersGet)
orderAdminRoute.get('/order-details', admin_authentication, admin_orderDetailsGet)
orderAdminRoute.post('/order-details', admin_authentication, admin_orderDetailsPost)
orderAdminRoute.get('/returned-orders', admin_authentication, admin_returnedOrdersGet)
orderAdminRoute.get('/return-order-details', admin_authentication, admin_orderReturnUpdatingGet)
orderAdminRoute.put('/return-order-confirmation', admin_authentication, admin_orderReturnConfirmationPut)


export default orderAdminRoute

