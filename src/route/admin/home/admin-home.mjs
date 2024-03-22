import express from "express";
import { admin_userListGet } from "../../../controller/admin/home/users-list.mjs";
import { admin_ordersGet } from "../../../controller/admin/home/orders.mjs";
import { admin_addNewProductsGet, admin_addNewProductsPost } from "../../../controller/admin/home/add-new-products.mjs";
import { admin_categoriesGet } from "../../../controller/admin/home/categories.mjs";
import { admin_dashboardGet } from "../../../controller/admin/home/dashboard.mjs";
import { admin_productsGet } from "../../../controller/admin/home/products.mjs";
import { upload } from "../../../middleware/multer.mjs";

const adminHomeRoute = express.Router()


adminHomeRoute.get('/users-list',admin_userListGet)

adminHomeRoute.get('/add-new-products',admin_addNewProductsGet)
adminHomeRoute.post('/add-new-products',upload.single("product-image"),admin_addNewProductsPost)

adminHomeRoute.get('/categories',admin_categoriesGet)

adminHomeRoute.get('/dashboard',admin_dashboardGet)

adminHomeRoute.get('/orders',admin_ordersGet)

adminHomeRoute.get('/products',admin_productsGet)



export default adminHomeRoute