import express from "express";
import { admin_userListGet } from "../../../controller/admin/home/users-list.mjs";
import { admin_ordersGet } from "../../../controller/admin/home/orders.mjs";
import { admin_addNewProductsGet, admin_addNewProductsPost } from "../../../controller/admin/home/add-new-products.mjs";
import { admin_categoriesGet, admin_categoriesPost } from "../../../controller/admin/home/categories.mjs";
import { admin_dashboardGet } from "../../../controller/admin/home/dashboard.mjs";
import { admin_productsGet } from "../../../controller/admin/home/products.mjs";
import { upload } from "../../../middleware/multer.mjs";
import { admin_editProductsGet, admin_editProductsPost } from "../../../controller/admin/home/edit-products.mjs";
import { admin_manageProducts } from "../../../controller/admin/home/manage-products.mjs";

const adminHomeRoute = express.Router()


adminHomeRoute.get('/users-list', admin_userListGet)

adminHomeRoute.get('/add-new-products', admin_addNewProductsGet)
adminHomeRoute.post('/add-new-products', upload.single("imageUrl"), admin_addNewProductsPost)

adminHomeRoute.get('/category', admin_categoriesGet)
adminHomeRoute.post('/category', admin_categoriesPost)

adminHomeRoute.get('/dashboard', admin_dashboardGet)

adminHomeRoute.get('/edit-products/:id', admin_editProductsGet)
adminHomeRoute.post('/edit-products', upload.single("imageUrl"), admin_editProductsPost)

adminHomeRoute.get('/manage-products/:id', admin_manageProducts)

adminHomeRoute.get('/orders', admin_ordersGet)

adminHomeRoute.get('/products', admin_productsGet)



export default adminHomeRoute