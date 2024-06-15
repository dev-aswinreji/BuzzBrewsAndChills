
import express from 'express'

const routeHome = express.Router()

import {user_authentication} from '../../../middleware/user-auth.mjs';
import {user_checkoutGet} from '../../../controller/user/checkout/checkout.mjs';

routeHome.get('/checkout',user_authentication, user_checkoutGet)

export default routeHome

