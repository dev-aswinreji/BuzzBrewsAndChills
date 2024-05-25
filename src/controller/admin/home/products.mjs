import { findAllProducts, findTotalCountOfAllProductsForAdmin } from "../../../data/products/find.mjs";

export const admin_productsGet = async (req, res) => {

    try {
        const limit = 3; 
        let page = Number(req.query.page) || 1; 
        
        const TOTAL_COUNT_OF_PRODUCTS = await findTotalCountOfAllProductsForAdmin();
        const totalPages = Math.ceil(TOTAL_COUNT_OF_PRODUCTS / limit);
        console.log(TOTAL_COUNT_OF_PRODUCTS,'total count is showing');
        page = Math.max(1, Math.min(page, totalPages));

        const skip = (page - 1) * limit;

        
        if (req.session.isAdminAuthenticated) {
    
            const product = await findAllProducts(skip,limit)
    
            res.render('products', { product , page,totalPages, count: TOTAL_COUNT_OF_PRODUCTS})
    
        } else {
            res.redirect('/admin')
        }
        
    } catch (error) {
        console.log(error,'ADMIN PRODUCT GET');
    }
} 