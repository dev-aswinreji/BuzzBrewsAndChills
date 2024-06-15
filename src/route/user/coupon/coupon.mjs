import express from 'express'

import {user_authentication} from '../../../middleware/user-auth.mjs';
import { user_applyCoupon } from '../../../controller/user/coupon/apply-coupon.mjs';
import { user_removeCouponGet } from '../../../controller/user/coupon/remove-coupon.mjs';

const routeHome = express.Router()



routeHome.get('/apply-coupon',user_applyCoupon)
routeHome.delete('/remove-coupon',user_removeCouponGet)
export default routeHome
