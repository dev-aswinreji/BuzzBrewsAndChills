import { imageDirectory } from "../../../app.mjs"
import { findCategory, findSingleProduct, findUniqueCategory } from "../../../data/products/find.mjs"
import { updateProducts } from "../../../data/products/update.mjs"
import fs from 'fs'

export const admin_editProductsGet = async (req, res) => {
    try {
        if(req.session.isAdminAuthenticated){
        const param = req.params.id
        console.log(param)
        const product = await findSingleProduct(param)
        const category = await findCategory()    
        console.log(product, 'single product is logged ');
        res.render('edit-products', { product ,category})
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
        let new_image = []
        const images = req.body.old_imageUrl                                  // values getting from req.body.old_image url is in the form of array
        console.log(images,'images from req.body is array or string');
        console.log(req.files,'req.files is');
        // if(req.files){
        //     new_image = req.files.filename
        //     try {
        //         console.log( req.body.old_imageUrl,'old imageUrl is showing');
        //         console.log(images);
        //         for(const image of images){ 
        //             fs.unlinkSync(imageDirectory+"/"+image)
        //         }
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }else{
        //     for (const image of images) {
                
        //         new_image.push(image)
        //         console.log(new_image,'new image in else case');
        //     }
        // }

        // const data = {
        //     name: req.body.name,
        //     category:categoryData,
        //     description:req.body.description,
        //     price:req.body.price,
        //     stock:req.body.stock,
        //     imageUrl:new_image
        // }

        // await updateProducts(id,data)
        // res.redirect('/admin/products')

    } catch (error) {
        console.error(error,'ADMIN EDIT PRODUCTS POST')
    }
}

