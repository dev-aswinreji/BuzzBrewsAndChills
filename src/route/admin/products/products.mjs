import express from "express";

import { admin_authentication } from "../../../middleware/admin-auth.mjs";

import { upload } from "../../../middleware/multer.mjs";

import { admin_productsGet } from "../../../controller/admin/products/products.mjs";
import { admin_addNewProductsGet, admin_addNewProductsPost } from "../../../controller/admin/products/add-new-products.mjs";
import { admin_manageProducts } from "../../../controller/admin/products/manage-products.mjs";
import { admin_deleteProductImages, admin_editProductsGet, admin_editProductsPost } from "../../../controller/admin/products/edit-products.mjs";

const productsRoute = express.Router()

productsRoute.get('/products', admin_authentication, admin_productsGet)

productsRoute.get('/add-new-products', admin_authentication, admin_addNewProductsGet)
productsRoute.post('/add-new-products', admin_authentication, upload.array("imageUrl", 5), admin_addNewProductsPost)

productsRoute.get('/edit-products/:id', admin_authentication, admin_editProductsGet)
productsRoute.post('/edit-products', upload.array("imageUrl", 5), admin_editProductsPost)

productsRoute.get('/manage-products/:id', admin_authentication, admin_manageProducts)
productsRoute.delete('/delete-image', admin_authentication, admin_deleteProductImages)

export default productsRoute


