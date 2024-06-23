import { findAllCouponForAdmin, findTotalNumberOfCouponCountForAdmin, findUniqueCouponForAdmin } from "../../../data/coupon/find.mjs"
import { insertCouponAdmin } from "../../../data/coupon/insert.mjs"
import { checkDataDuplication } from "../../../validation/checking-duplicateData.mjs";


export const admin_couponGet = async (req, res) => {
    try {
        const limit = 7;
        let page = Number(req.query.page) || 1;

        const TOTAL_COUNT_OF_COUPON = await findTotalNumberOfCouponCountForAdmin();
        const totalPages = Math.ceil(TOTAL_COUNT_OF_COUPON / limit);
        console.log(TOTAL_COUNT_OF_COUPON, 'total count is showing');
        page = Math.max(1, Math.min(page, totalPages));

        const skip = (page - 1) * limit;

        const coupon = await findAllCouponForAdmin(skip, limit)
        res.render('coupon', { coupon, totalPages, page, count: TOTAL_COUNT_OF_COUPON })
    } catch (error) {
        console.log(error, 'admin coupon get error ');
    }

}

export const admin_couponPost = async (req, res) => {
    try {
        // const couponData = {
        //     name: req.body.name,
        //     discount: req.body.discount,
        //     description: req.body.description,
        //     minimum_cart_price: req.body.minimum_cart_price,
        //     starting_date: new Date(),
        //     ending_date: new Date() + 10
        // }
        // console.log(couponData, 'coupon data is showing');
        // console.log(typeof couponData.discount);
        // console.log(typeof couponData.minimum_cart_price, 'hhhhhhadsofikh');
        const coupon = req.body
        console.log(coupon, 'couupon data is showing');
        const { name,discount,starting_date,expiry,minimum_cart_price,description } = coupon
        const couponData = {
            name:name,
            discount:Number(discount),
            starting_date:starting_date,
            ending_date:expiry,
            minimum_cart_price:Number(minimum_cart_price),
            description:description,
        }
        const couponValidation = await findUniqueCouponForAdmin(couponData.name)
        const result = await checkDataDuplication(couponValidation)
        if (result === 'NOT EXIST') {
            const data = await insertCouponAdmin(couponData)
            console.log(data, 'coupon data is shwoing of ');
            res.json({ result: 'success' })
        } else {
            res.json({ result: 'already exists' })
        }
        // res.redirect('/admin/coupon')
    } catch (error) {
        console.log(error, 'admin coupon post error');
    }
}