import express from 'express'

import {user_authentication} from '../../../middleware/user-auth.mjs';

import { user_applyCoupon } from '../../../controller/user/coupon/apply-coupon.mjs';
import { user_removeCouponGet } from '../../../controller/user/coupon/remove-coupon.mjs';

const couponUserRoute = express.Router()

couponUserRoute.get('/apply-coupon',user_authentication,user_applyCoupon)
couponUserRoute.delete('/remove-coupon',user_authentication,user_removeCouponGet)

export default couponUserRoute
