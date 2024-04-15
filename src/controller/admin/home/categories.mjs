import { findCategory } from "../../../data/products/find.mjs"
import { insertCategoryForProducts } from "../../../data/products/insert.mjs"



export const admin_categoriesGet = async (req, res) => {
    try {
        
        if (req.session.isAdminAuthenticated) {
    
            const category = await findCategory()
            res.render('categories', { category })
        } else {
            res.redirect('/admin')
        }
    } catch (error) {
        console.log(error,'ADMIN CATEGORY GET');
    }
}


export const admin_categoriesPost = async (req, res) => {
    try {
        
        const data = {
            name: req.body.name,
            description: req.body.description,
        }
        
        await insertCategoryForProducts(data)
    
        res.redirect('/admin/category')

    } catch (error) {
        console.log(error,'ADMIN CATEGORY POST');
    }


}
