import express from 'express'

import { user_authentication } from '../../../middleware/user-auth.mjs';

import { user_orderListGet } from '../../../controller/user/order/order-history.mjs';
import { user_cancelOrderGet } from '../../../controller/user/order/cancel-order.mjs';
import { user_orderPlacedGet } from '../../../controller/user/order/order-placed.mjs';
import { user_orderAddGet } from '../../../controller/user/order/add-order.mjs';
import { user_returnOrderGet } from '../../../controller/user/order/return-order.mjs';
import { user_orderInvoiceGet } from '../../../controller/user/order/order-invoice.mjs';

const routeHome = express.Router()

routeHome.get('/order-add', user_authentication, user_orderAddGet)
routeHome.get('/order-placed', user_authentication, user_orderPlacedGet)

routeHome.get('/cancel-order', user_authentication, user_cancelOrderGet)
routeHome.get('/return-order', user_authentication, user_returnOrderGet)

routeHome.get('/order-history', user_authentication, user_orderListGet)
routeHome.get('/order-invoice', user_orderInvoiceGet)


export default routeHome
