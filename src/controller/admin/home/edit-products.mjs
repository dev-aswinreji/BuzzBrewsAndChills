import { imageDirectory } from "../../../app.mjs"
import { findCategory, findSingleProduct, findSingleProductWithSameName, findUniqueCategory } from "../../../data/products/find.mjs"
import { updateProducts } from "../../../data/products/update.mjs"
import fs from 'fs'
import { checkDataDuplication } from "../../../validation/checking-duplicateData.mjs"

export const admin_editProductsGet = async (req, res) => {
    try {
        if(req.session.isAdminAuthenticated){
        const param = req.params.id
        console.log(param)
        const product = await findSingleProduct(param)
        const category = await findCategory()    
        console.log(product, 'single product is logged ');
        const error = req.session.productError
        res.render('edit-products', { product ,category,error})
        }else{
        res.redirect('/admin/signin')
        }

    } catch (error) {
        console.log(error,'ADMIN EDIT PRODUCTS GET')
    }
}


export const admin_editProductsPost = async (req, res) => {

    try {
        const id = req.body.productId
        const productName = req.body.name.trim()
        console.log(productName);
        const productData = await findSingleProduct(id)
        const isDuplicateProduct = await findSingleProductWithSameName(productName)
        console.log(isDuplicateProduct);
        const result = await checkDataDuplication(isDuplicateProduct)
        console.log(result);
        if(productData.name === productName){
            res.json(200)
        }else{
            req.session.productError = 'product is already exist'
            res.redirect(`/admin/edit-products/${id}`)
        }
        // if(result === 'EXIST'){
        //     req.session.productError = 'Product is already exist'
        //     return res.redirect(`/admin/edit-products/${id}`)
        // }

    } catch (error) {
        console.error(error,'ADMIN EDIT PRODUCTS POST')
    }
}

