import express from "express";

import {admin_authentication} from "../../../middleware/admin-auth.mjs";

import {admin_categoriesGet, admin_categoriesPost} from "../../../controller/admin/category/categories.mjs";
import {admin_editCategoryGet, admin_editCategoryPost} from "../../../controller/admin/category/edit-category.mjs";
import {admin_manageCategory} from "../../../controller/admin/category/manage-category.mjs";

const categoryRoute = express.Router()

categoryRoute.get('/category', admin_authentication, admin_categoriesGet)
categoryRoute.post('/category',admin_authentication, admin_categoriesPost)

categoryRoute.get('/edit-category/:id', admin_authentication, admin_editCategoryGet)
categoryRoute.post('/edit-category/:id',admin_authentication, admin_editCategoryPost)

categoryRoute.get('/manage-category/:id', admin_authentication, admin_manageCategory)

export default categoryRoute

