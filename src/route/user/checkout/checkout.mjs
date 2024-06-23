
import express from 'express'

import {user_authentication} from '../../../middleware/user-auth.mjs';

import {user_checkoutGet} from '../../../controller/user/checkout/checkout.mjs';

const checkoutRoute = express.Router()

checkoutRoute.get('/checkout',user_authentication, user_checkoutGet)

export default checkoutRoute

