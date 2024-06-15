import express from "express";
import {admin_authentication} from "../../../middleware/admin-auth.mjs";

import {upload} from "../../../middleware/multer.mjs";
import { admin_couponGet, admin_couponPost } from "../../../controller/admin/coupon/coupon.mjs";

import { admin_editCouponGet, admin_editCouponPost, admin_updateCouponStatusPut } from "../../../controller/admin/coupon/edit-coupon.mjs";


const adminHomeRoute = express.Router()
adminHomeRoute.get('/coupon',admin_authentication,admin_couponGet)
adminHomeRoute.post('/coupon',admin_authentication,admin_couponPost)

adminHomeRoute.get('/edit-coupon',admin_authentication,admin_editCouponGet)
adminHomeRoute.put('/edit-coupon',admin_authentication,upload.none(),admin_editCouponPost)
adminHomeRoute.put('/update-coupon',admin_authentication,admin_updateCouponStatusPut)

export default adminHomeRoute

