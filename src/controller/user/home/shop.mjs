import { findAllProductsForUser, findAllProductsForUserSortingHighToLow, findAllProductsForUserSortingLowToHigh, findTotalCountOfAllProducts } from "../../../data/products/find.mjs";

export const user_shopGet = async (req, res) => {
    try {
        const limit = 3; 
        let page = Number(req.query.page) || 1; 
        const sortOption = req.query.sortOption || 'default'; 
        
        const TOTAL_COUNT_OF_PRODUCTS = await findTotalCountOfAllProducts();
        const totalPages = Math.ceil(TOTAL_COUNT_OF_PRODUCTS / limit);
        
        page = Math.max(1, Math.min(page, totalPages));

        const skip = (page - 1) * limit;

        let products;
        switch (sortOption) {
            case 'priceLowHigh':
                products = await findAllProductsForUserSortingLowToHigh(skip, limit);
                break;
            case 'priceHighLow':
                products = await findAllProductsForUserSortingHighToLow(skip, limit);
                break;
            default:
                products = await findAllProductsForUser(skip, limit);
                break;
        }

        res.render('shop', { products, page, sortOption,totalPages, count: TOTAL_COUNT_OF_PRODUCTS });
    } catch (error) {
        console.error(error, 'USER SHOP GET');
        res.status(500).send('Internal Server Error');
    }
};
