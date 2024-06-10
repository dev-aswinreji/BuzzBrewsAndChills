import { findUniqueCouponForAdmin, findUniqueCouponForAdminToEdit } from "../../../data/coupon/find.mjs"
import { adminCouponStatusUpdate, adminCouponUpdate } from "../../../data/coupon/update.mjs"
import { checkDataDuplication } from "../../../validation/checking-duplicateData.mjs"

export const admin_editCouponGet = async (req, res) => {
    const { couponId } = req.query
    const coupon = await findUniqueCouponForAdminToEdit(couponId)
    console.log(coupon);
    res.render('edit-coupon', { coupon })
}

export const admin_updateCouponStatusPut = async (req, res) => {
    const { couponId, couponStatus } = req.body
    await adminCouponStatusUpdate(couponId, couponStatus)
    res.json({ result: 'success' })
}


export const admin_editCouponPost = async (req, res) => {

    const { couponId } = req.query
    const formData = req.body
    const {
        name, discount, starting_date, expiry, minimum_cart_price, description
    } = formData

    const updatedCouponData = {
        name: name,
        discount: Number(discount),
        starting_date: starting_date,
        ending_date: expiry,
        mininmum_cart_price: Number(minimum_cart_price),
        description: description,
    }
    const coupon = await findUniqueCouponForAdmin(updatedCouponData.name)
    const result = await checkDataDuplication(coupon)

    if (result === 'NOT EXIST' || coupon._id.equals(couponId)) {
        await adminCouponUpdate(couponId, updatedCouponData)
        res.json({ result: 'success' })
    } else {
        req.session.couponError = 'coupon already exists'
        res.json({ result: 'already exists' })
    }

}