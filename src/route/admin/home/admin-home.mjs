import express from "express";
import {admin_userListGet, admin_userListManage} from "../../../controller/admin/users-list/users-list.mjs";
import {admin_ordersGet} from "../../../controller/admin/order/orders.mjs";
import {admin_addNewProductsGet, admin_addNewProductsPost} from "../../../controller/admin/products/add-new-products.mjs";
import {admin_categoriesGet, admin_categoriesPost} from "../../../controller/admin/category/categories.mjs";
import {admin_dashboardGet} from "../../../controller/admin/dashboard/dashboard.mjs";
import {admin_productsGet} from "../../../controller/admin/products/products.mjs";
import {upload} from "../../../middleware/multer.mjs";
import {admin_deleteProductImages, admin_editProductsGet, admin_editProductsPost} from "../../../controller/admin/products/edit-products.mjs";
import {admin_manageProducts} from "../../../controller/admin/products/manage-products.mjs";
import {admin_editCategoryGet, admin_editCategoryPost} from "../../../controller/admin/category/edit-category.mjs";
import {admin_manageCategory} from "../../../controller/admin/category/manage-category.mjs";
import {admin_authentication} from "../../../middleware/admin-auth.mjs";
import { admin_orderDetailsGet, admin_orderDetailsPost } from "../../../controller/admin/order/order-details.mjs";
import { admin_couponGet, admin_couponPost } from "../../../controller/admin/coupon/coupon.mjs";
import { admin_editCouponGet, admin_editCouponPost, admin_updateCouponStatusPut } from "../../../controller/admin/coupon/edit-coupon.mjs";
import { admin_salesReportDownloadGet, admin_salesReportGet } from "../../../controller/admin/sales-report/sales-report.mjs";
import { admin_pdfFormat } from "../../../controller/admin/sales-report/pdf-format.mjs";
import { admin_returnedOrdersGet } from "../../../controller/admin/order/returned-orders.mjs";
import { admin_orderReturnConfirmationPut, admin_orderReturnUpdatingGet } from "../../../controller/admin/order/update-return-order.mjs";

const adminHomeRoute = express.Router()

adminHomeRoute.get('/users-list', admin_authentication, admin_userListGet)
adminHomeRoute.get('/user-manage/:id', admin_authentication, admin_userListManage)

adminHomeRoute.get('/add-new-products',admin_authentication, admin_addNewProductsGet)
adminHomeRoute.post('/add-new-products',admin_authentication, upload.array("imageUrl", 5), admin_addNewProductsPost)

adminHomeRoute.get('/category', admin_authentication, admin_categoriesGet)
adminHomeRoute.post('/category',admin_authentication, admin_categoriesPost)

adminHomeRoute.get('/edit-category/:id', admin_authentication, admin_editCategoryGet)
adminHomeRoute.post('/edit-category/:id',admin_authentication, admin_editCategoryPost)

adminHomeRoute.get('/manage-category/:id', admin_authentication, admin_manageCategory)

adminHomeRoute.get('/dashboard',admin_authentication, admin_dashboardGet)

adminHomeRoute.get('/edit-products/:id', admin_authentication, admin_editProductsGet)
adminHomeRoute.post('/edit-products', upload.array("imageUrl", 5), admin_editProductsPost)

adminHomeRoute.get('/manage-products/:id', admin_authentication, admin_manageProducts)

adminHomeRoute.get('/orders', admin_authentication, admin_ordersGet)
adminHomeRoute.get('/order-details',admin_authentication,admin_orderDetailsGet)
adminHomeRoute.post('/order-details',admin_authentication,admin_orderDetailsPost)
adminHomeRoute.get('/returned-orders',admin_authentication,admin_returnedOrdersGet)
adminHomeRoute.get('/return-order-details',admin_authentication,admin_orderReturnUpdatingGet)
adminHomeRoute.put('/return-order-confirmation',admin_authentication,admin_orderReturnConfirmationPut)

adminHomeRoute.get('/products', admin_authentication, admin_productsGet)
adminHomeRoute.delete('/delete-image',admin_authentication,admin_deleteProductImages)

adminHomeRoute.get('/coupon',admin_authentication,admin_couponGet)
adminHomeRoute.post('/coupon',admin_authentication,admin_couponPost)

adminHomeRoute.get('/edit-coupon',admin_authentication,admin_editCouponGet)
adminHomeRoute.put('/edit-coupon',admin_authentication,upload.none(),admin_editCouponPost)
adminHomeRoute.put('/update-coupon',admin_authentication,admin_updateCouponStatusPut)

adminHomeRoute.get('/sales-report',admin_authentication,admin_salesReportGet)
adminHomeRoute.get('/report/download/:period',admin_authentication,admin_salesReportDownloadGet)
adminHomeRoute.get('/download-report',admin_authentication,admin_pdfFormat)

export default adminHomeRoute
