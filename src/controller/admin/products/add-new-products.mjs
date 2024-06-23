import { imageDirectory } from "../../../app.mjs"
import { findCategory, findUniqueCategory } from "../../../data/products/find.mjs"
import { insertNewProducts } from "../../../data/products/insert.mjs"
import { validateImage } from "../../../utils/validateImage.mjs"
import fs from 'fs'



export const admin_addNewProductsGet = async (req, res) => {

    try {

        if (req.session.isAdminAuthenticated) {
            const category = await findCategory()
            const error = req.session.productError
            res.render('addNewProducts', { category, error })
            req.session.productError = ''
        } else {
            res.redirect('/admin')
        }

    } catch (error) {
        console.log(error, 'ADMIN ADD NEW PRODUCTS GET');
    }
}


export const admin_addNewProductsPost = async (req, res) => {

    try {

        const file = req.files
        console.log(file, 'file is showing or not ');

        const categoryName = req.body.category
        const category = await findUniqueCategory(categoryName)
        let imageUrl = []
        let count = 0
        let imageValidating;
        for (const file of req.files) {

            imageValidating = await validateImage(file.path)

        }
        console.log(imageValidating);
        if (imageValidating) {
            for (const file of req.files) {

                imageUrl[count] = file.filename
                count++

            }
        } else {
            for (const file of req.files) {
                fs.unlinkSync(imageDirectory + '/' + file.filename, (err => {
                    if (err) console.log('some error occured in admin delete product images ', err);
                    else {
                        console.log(imageDirectory + '/' + file.filename);
                    }
                }))
            }
            req.session.productError = 'Input file contains unsupported image format'
            return res.redirect('/admin/add-new-products')
        }
        const categoryDiscount = category.discount
        console.log(categoryDiscount, 'category discount is showing ');
        const productDiscount = Number(req.body.discount) || 0
        const discount = categoryDiscount < productDiscount ? productDiscount : categoryDiscount
        console.log(discount, 'discount is showing');
        const price = Number(req.body.price)
        console.log(discount)
        console.log(price, 'price is showing');
        const discount_price = price - (price * discount / 100)
        console.log(discount_price)


        const product_data = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: category,
            stock: req.body.stock,
            imageUrl: imageUrl,
            discount: productDiscount,
            discount_price: discount_price
        }

        console.log(imageUrl, 'imageurl Multiple ');

        // const product_data = {name,description,price,category,stock,imageUrl}
        // console.log(product_data,'product data is showing successfully');

        await insertNewProducts(product_data)
        res.redirect('/admin/add-new-products')

    } catch (error) {
        console.log(error, 'ADMIN ADD NEW PRODUCTS POST');
    }
}


