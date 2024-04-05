import { findCategory } from "../../../data/products/find.mjs"
import { insertCategoryForProducts } from "../../../data/products/insert.mjs"



export const admin_categoriesGet = async (req, res) => {
    if (req.session.isAdminAuthenticated) {

        const category = await findCategory()
        res.render('categories', { category })
    } else {
        res.redirect('/admin')
    }
}


export const admin_categoriesPost = async (req, res) => {

    const data = {
        name: req.body.name,
        description: req.body.description,
    }
    
    await insertCategoryForProducts(data)

    res.redirect('/admin/category')

}
