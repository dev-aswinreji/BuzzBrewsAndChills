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
        
        console.log(req.body)
        const categoryName = req.body.category
        console.log(categoryName)
    
        const categoryData = await findUniqueCategory(categoryName)
        console.log(categoryData)
        console.log(req.query)
        console.log(req.files.filename);

        let imageUrlMultiple = []
        let count = 0
        for(const file of req.files){
            imageUrlMultiple[count] = file.filename
            count++
        }

        console.log(imageUrlMultiple,'imageurl Multiple ');

        const product_data = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: categoryData,
            stock: req.body.stock,
            imageUrl: imageUrlMultiple
        }
        await insertNewProducts(product_data)
        res.redirect('/admin/add-new-products')

    } catch (error) {
        console.log(error,'ADMIN ADD NEW PRODUCTS POST');
    }
}