import { imageDirectory } from "../../../app.mjs"
import { findSingleProduct, findUniqueCategory } from "../../../data/products/find.mjs"
import { updateProducts } from "../../../data/products/update.mjs"
import fs from 'fs'

export const admin_editProductsGet = async (req, res) => {
    try {
        if(req.session.isAdminAuthenticated){
        const param = req.params.id
        console.log(param)
        const product = await findSingleProduct(param)
        console.log(product, 'single product is logged ');
        res.render('edit-products', { product })
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
        const categoryName = req.body.category
        const categoryData = await findUniqueCategory(categoryName)
        let new_image = ''

        if(req.file){
            new_image = req.file.filename
            try {
                fs.unlinkSync(imageDirectory+req.body.old_imageUrl)
            } catch (error) {
                console.log(error);
            }
        }else{
            new_image = req.body.old_imageUrl
        }

        const data = {
            name: req.body.name,
            category:categoryData,
            description:req.body.description,
            price:req.body.price,
            stock:req.body.stock,
            imageUrl:new_image
        }

        console.log(req.body.productId);

        await updateProducts(id,data)
        res.redirect('/admin/products')

    } catch (error) {
        console.error(error,'ADMIN EDIT PRODUCTS POST')
    }
}

