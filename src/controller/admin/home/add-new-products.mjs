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
       
        const file = req.files
        console.log(file,'file is showing or not ');

        const categoryName = req.body.category
        let imageUrl = []
        let count = 0
        for(const file of req.files){
            imageUrl[count] = file.filename
              count++
        }

        const category = await findUniqueCategory(categoryName)
        
        const product_data = {
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            category:category,
            stock:req.body.stock,
            imageUrl:imageUrl
        }

        console.log(imageUrl,'imageurl Multiple ');

        // const product_data = {name,description,price,category,stock,imageUrl}
        // console.log(product_data,'product data is showing successfully');
        
        await insertNewProducts(product_data)
        res.redirect('/admin/add-new-products')

    } catch (error) {
        console.log(error,'ADMIN ADD NEW PRODUCTS POST');
    }
}