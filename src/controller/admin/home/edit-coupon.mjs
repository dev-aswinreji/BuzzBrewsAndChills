import { findUniqueCouponForAdminToEdit } from "../../../data/coupon/find.mjs"
import { adminCouponStatusUpdate, adminCouponUpdate } from "../../../data/coupon/update.mjs"


export const admin_editCouponGet = async (req,res)=>{
    const {couponId} = req.query
    const coupon = await findUniqueCouponForAdminToEdit(couponId)
    console.log(coupon);
    res.render('edit-coupon',{coupon})
}

export const admin_updateCouponStatusPut = async (req,res)=>{
    const {couponId,couponStatus} = req.body
    await adminCouponStatusUpdate(couponId,couponStatus)
    res.json({result:'success'})
}


export const admin_editCouponPost = async (req,res)=>{
    const {couponId} = req.query
    const couponData = {
        name : req.body.name,
        discount:req.body.discount,
        description:req.body.description,
        minimum_cart_price:req.body.minimum_cart_price,
        ending_date:req.body.expiry,
    }
    console.log(couponData,'didihdhd');
    console.log(couponData.ending_date,'end date');
    const result = await adminCouponUpdate(couponId,couponData)
    console.log(result,'result is showing');
    res.redirect('/admin/coupon')
    
}