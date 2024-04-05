import { findCategory, findUniqueCategory } from "../../../data/products/find.mjs"
import { insertNewProducts } from "../../../data/products/insert.mjs"


export const admin_addNewProductsGet = async (req, res) => {
    if (req.session.isAdminAuthenticated) {
        const category = await findCategory()
        res.render('addNewProducts', { category })

    } else {
        res.redirect('/admin')
    }
}


export const admin_addNewProductsPost = async (req, res) => {

    console.log(req.body)
    const categoryName = req.body.category
    console.log(categoryName)

    const categoryData = await findUniqueCategory(categoryName)
    console.log(categoryData)
    console.log(req.query)

    const product_data = {
        name: req.body.product_name,
        description: req.body.product_description,
        price: req.body.product_price,
        category: categoryData,
        stock: req.body.product_stock,
        imageUrl: req.file.filename,
        // availability:'ACTIVE'
    }
    await insertNewProducts(product_data)
    res.redirect('/admin/add-new-products')
}