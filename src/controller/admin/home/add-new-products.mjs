import { findCategory, findUniqueCategory } from "../../../data/products/find.mjs"
import { insertNewProducts } from "../../../data/products/insert.mjs"


export const admin_addNewProductsGet = async (req, res) => {

    try {

        if (req.session.isAdminAuthenticated) {
            const category = await findCategory()
            res.render('addNewProducts', { category })

        } else {
            res.redirect('/admin')
        }

    } catch (error) {
        console.log(error, 'ADMIN ADD NEW PRODUCTS GET');
    }
}


export const admin_addNewProductsPost = async (req, res) => {

    try {
        let imageUrl = []
        let count = 0
        for(const file of req.files){
            imageUrl[count] = file.filename
              count++
        }

        console.log(imageUrl,'imageurl Multiple ');
        const {name,description,price,stock} = JSON.parse(JSON.stringify(req.body))

        const category = await findUniqueCategory(categoryName)

        const product_data = {name,description,price,category,stock,imageUrl}
        console.log(product_data,'product data is showing successfully');
        
        await insertNewProducts(product_data)
        res.redirect('/admin/add-new-products')

    } catch (error) {
        console.log(error,'ADMIN ADD NEW PRODUCTS POST');
    }
}