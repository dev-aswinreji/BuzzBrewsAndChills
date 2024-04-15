import { findAllProducts } from "../../../data/products/find.mjs";

export const admin_productsGet = async (req, res) => {

    try {
        
        if (req.session.isAdminAuthenticated) {
    
            const product = await findAllProducts()
    
            res.render('products', { product })
    
        } else {
            res.redirect('/admin')
        }
        
    } catch (error) {
        console.log(error,'ADMIN PRODUCT GET');
    }
} 