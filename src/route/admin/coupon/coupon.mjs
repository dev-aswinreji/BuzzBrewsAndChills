import express from "express";

import { admin_authentication } from "../../../middleware/admin-auth.mjs";

import { upload } from "../../../middleware/multer.mjs";

import { admin_couponGet, admin_couponPost } from "../../../controller/admin/coupon/coupon.mjs";
import { admin_editCouponGet, admin_editCouponPost, admin_updateCouponStatusPut } from "../../../controller/admin/coupon/edit-coupon.mjs";

const couponAdminRoute = express.Router()

couponAdminRoute.get('/coupon', admin_authentication, admin_couponGet)
couponAdminRoute.post('/coupon', admin_authentication, admin_couponPost)

couponAdminRoute.get('/edit-coupon', admin_authentication, admin_editCouponGet)
couponAdminRoute.put('/edit-coupon', admin_authentication, upload.none(), admin_editCouponPost)

couponAdminRoute.put('/update-coupon', admin_authentication, admin_updateCouponStatusPut)

export default couponAdminRoute

