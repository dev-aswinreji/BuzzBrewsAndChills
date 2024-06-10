import express from "express";
import {admin_userListGet, admin_userListManage} from "../../../controller/admin/home/users-list.mjs";
import {admin_ordersGet} from "../../../controller/admin/home/orders.mjs";
import {admin_addNewProductsGet, admin_addNewProductsPost} from "../../../controller/admin/home/add-new-products.mjs";
import {admin_categoriesGet, admin_categoriesPost} from "../../../controller/admin/home/categories.mjs";
import {admin_dashboardGet} from "../../../controller/admin/home/dashboard.mjs";
import {admin_productsGet} from "../../../controller/admin/home/products.mjs";
import {upload} from "../../../middleware/multer.mjs";
import {admin_deleteProductImages, admin_editProductsGet, admin_editProductsPost} from "../../../controller/admin/home/edit-products.mjs";
import {admin_manageProducts} from "../../../controller/admin/home/manage-products.mjs";
import {admin_editCategoryGet, admin_editCategoryPost} from "../../../controller/admin/home/edit-category.mjs";
import {admin_manageCategory} from "../../../controller/admin/home/manage-category.mjs";
import {admin_authentication} from "../../../middleware/admin-auth.mjs";
import { admin_orderDetailsGet, admin_orderDetailsPost } from "../../../controller/admin/home/order-details.mjs";
import { admin_couponGet, admin_couponPost } from "../../../controller/admin/home/coupon.mjs";
import { admin_editCouponGet, admin_editCouponPost, admin_updateCouponStatusPut } from "../../../controller/admin/home/edit-coupon.mjs";
import { admin_salesReportDownloadGet, admin_salesReportGet } from "../../../controller/admin/home/sales-report.mjs";
import { admin_pdfFormat } from "../../../controller/admin/home/pdf-format.mjs";
import { admin_returnedOrdersGet } from "../../../controller/admin/home/returned-orders.mjs";

const adminHomeRoute = express.Router()

adminHomeRoute.get('/users-list', admin_authentication, admin_userListGet)
adminHomeRoute.get('/user-manage/:id', admin_authentication, admin_userListManage)

adminHomeRoute.get('/add-new-products',admin_authentication, admin_addNewProductsGet)
adminHomeRoute.post('/add-new-products', upload.array("imageUrl", 5), admin_addNewProductsPost)

adminHomeRoute.get('/category', admin_authentication, admin_categoriesGet)
adminHomeRoute.post('/category', admin_categoriesPost)

adminHomeRoute.get('/edit-category/:id', admin_authentication, admin_editCategoryGet)
adminHomeRoute.post('/edit-category/:id', admin_editCategoryPost)

adminHomeRoute.get('/manage-category/:id', admin_authentication, admin_manageCategory)

adminHomeRoute.get('/dashboard', admin_dashboardGet)

adminHomeRoute.get('/edit-products/:id', admin_authentication, admin_editProductsGet)
adminHomeRoute.post('/edit-products', upload.array("imageUrl", 5), admin_editProductsPost)

adminHomeRoute.get('/manage-products/:id', admin_authentication, admin_manageProducts)

adminHomeRoute.get('/orders', admin_authentication, admin_ordersGet)
adminHomeRoute.get('/order-details',admin_authentication,admin_orderDetailsGet)
adminHomeRoute.post('/order-details',admin_authentication,admin_orderDetailsPost)
adminHomeRoute.get('/returned-orders',admin_returnedOrdersGet)

adminHomeRoute.get('/products', admin_authentication, admin_productsGet)
adminHomeRoute.delete('/delete-image',admin_authentication,admin_deleteProductImages)

adminHomeRoute.get('/coupon',admin_authentication,admin_couponGet)
adminHomeRoute.post('/coupon',admin_authentication,admin_couponPost)

adminHomeRoute.get('/edit-coupon',admin_editCouponGet)
adminHomeRoute.put('/edit-coupon',upload.none(),admin_editCouponPost)
adminHomeRoute.put('/update-coupon',admin_updateCouponStatusPut)

adminHomeRoute.get('/sales-report',admin_salesReportGet)
adminHomeRoute.get('/report/download/:period',admin_salesReportDownloadGet)
adminHomeRoute.get('/download-report',admin_pdfFormat)

export default adminHomeRoute
