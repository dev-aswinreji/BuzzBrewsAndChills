import express from "express";
import {admin_authentication} from "../../../middleware/admin-auth.mjs";


import {admin_ordersGet} from "../../../controller/admin/order/orders.mjs";
import { admin_orderDetailsGet, admin_orderDetailsPost } from "../../../controller/admin/order/order-details.mjs";
import { admin_returnedOrdersGet } from "../../../controller/admin/order/returned-orders.mjs";
import { admin_orderReturnConfirmationPut, admin_orderReturnUpdatingGet } from "../../../controller/admin/order/update-return-order.mjs";

const adminHomeRoute = express.Router()
adminHomeRoute.get('/orders', admin_authentication, admin_ordersGet)
adminHomeRoute.get('/order-details',admin_authentication,admin_orderDetailsGet)
adminHomeRoute.post('/order-details',admin_authentication,admin_orderDetailsPost)
adminHomeRoute.get('/returned-orders',admin_authentication,admin_returnedOrdersGet)
adminHomeRoute.get('/return-order-details',admin_authentication,admin_orderReturnUpdatingGet)
adminHomeRoute.put('/return-order-confirmation',admin_authentication,admin_orderReturnConfirmationPut)


export default adminHomeRoute

