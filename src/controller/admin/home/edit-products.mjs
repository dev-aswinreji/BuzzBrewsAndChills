import { imageDirectory } from "../../../app.mjs"
import { findCategory, findSingleProduct, findSingleProductWithSameName, } from "../../../data/products/find.mjs"
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
        const productData = await findSingleProduct(id)
        const isDuplicateProduct = await findSingleProductWithSameName(productName)
        const result = await checkDataDuplication(isDuplicateProduct)
        if(productData.name === productName || result === 'NOT EXIST'){
            try {
                
            } catch (error) {
                console.log(error,'Update Product Error');
            }
        }else{
            req.session.productError = 'product is already exist'
            res.redirect(`/admin/edit-products/${id}`)
        }

    } catch (error) {
        console.error(error,'ADMIN EDIT PRODUCTS POST')
        res.send(500)
    }
}
