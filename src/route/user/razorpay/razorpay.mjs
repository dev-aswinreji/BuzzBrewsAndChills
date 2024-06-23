import express from 'express'

import {user_authentication} from '../../../middleware/user-auth.mjs';

import { user_razorpay } from '../../../controller/user/razorpay/razorpay.mjs';
import { user_paymentFailedHandler, user_paymentFailedPage } from '../../../controller/user/razorpay/razorpay-payment-failed.mjs';
import { user_orderFailedUpdate } from '../../../controller/user/order/update-failed-order.mjs';

const razorpayRoute = express.Router()

razorpayRoute.post('/razorpay-payment',user_authentication,user_razorpay)
razorpayRoute.post('/payment-failed-handler',user_authentication,user_paymentFailedHandler)
razorpayRoute.get('/payment-failed-page',user_authentication,user_paymentFailedPage)
razorpayRoute.get('/order-add-failed-payment',user_authentication,user_orderFailedUpdate)


export default razorpayRoute
