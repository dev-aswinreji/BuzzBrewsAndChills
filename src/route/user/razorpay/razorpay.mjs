import express from 'express'

import {user_authentication} from '../../../middleware/user-auth.mjs';

import { user_razorpay } from '../../../controller/user/razorpay/razorpay.mjs';
import { user_paymentFailedHandler, user_paymentFailedPage } from '../../../controller/user/razorpay/razorpay-payment-failed.mjs';
import { user_orderFailedUpdate } from '../../../controller/user/order/update-failed-order.mjs';
const routeHome = express.Router()



routeHome.post('/razorpay-payment',user_authentication,user_razorpay)
routeHome.post('/payment-failed-handler',user_paymentFailedHandler)
routeHome.get('/payment-failed-page',user_paymentFailedPage)
routeHome.get('/order-add-failed-payment',user_orderFailedUpdate)


export default routeHome
