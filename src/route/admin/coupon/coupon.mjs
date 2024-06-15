import express from "express";

import { admin_authentication } from "../../../middleware/admin-auth.mjs";

import { upload } from "../../../middleware/multer.mjs";

import { admin_couponGet, admin_couponPost } from "../../../controller/admin/coupon/coupon.mjs";
import { admin_editCouponGet, admin_editCouponPost, admin_updateCouponStatusPut } from "../../../controller/admin/coupon/edit-coupon.mjs";

const couponRoute = express.Router()

couponRoute.get('/coupon', admin_authentication, admin_couponGet)
couponRoute.post('/coupon', admin_authentication, admin_couponPost)

couponRoute.get('/edit-coupon', admin_authentication, admin_editCouponGet)
couponRoute.put('/edit-coupon', admin_authentication, upload.none(), admin_editCouponPost)

couponRoute.put('/update-coupon', admin_authentication, admin_updateCouponStatusPut)

export default couponRoute

