import { findAllProductsForUser, findAllProductsForUserSortingAtoZ, findAllProductsForUserSortingHighToLow, findAllProductsForUserSortingLowToHigh, findAllProductsForUserSortingZtoA, findProductCategoryFiltering, findSearchedProductForUserUsingRegex, findTotalCountOfAllProducts } from "../../../data/products/find.mjs";

export const user_shopGet = async (req, res) => {
    try {
        const limit = 3; 
        let page = Number(req.query.page) || 1; 
        const sortOption = req.query.sortOption || 'default'; 
        const categoryName = req.query.categoryName
        const TOTAL_COUNT_OF_PRODUCTS = await findTotalCountOfAllProducts();
        const totalPages = Math.ceil(TOTAL_COUNT_OF_PRODUCTS / limit);
        const search = req.query.search
        console.log(search,'search is showing');
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
            case 'A-Z':
                products = await findAllProductsForUserSortingAtoZ(skip,limit)
                break;
            case 'Z-A':
                products = await findAllProductsForUserSortingZtoA(skip,limit)
                break;
            default:
                products = await findAllProductsForUser(skip, limit);
                break;
        }
        console.log(products,'products is showingadlfj');
        if(categoryName){
            console.log(categoryName,'categoryName is shwoing ==========');
            products = await findProductCategoryFiltering(categoryName)
        }
        if(search){
            console.log(search,'regex in seardch is showing');
            const name = { name: { $regex: search, $options: 'i' } }
            console.log(name,'regex is showing');
            products = await findSearchedProductForUserUsingRegex(name,skip,limit)
            console.log(products,'products is showing');
        }

        res.render('shop', { products, page, sortOption,totalPages, count: TOTAL_COUNT_OF_PRODUCTS });
    } catch (error) {
        console.error(error, 'USER SHOP GET');
        res.status(500).send('Internal Server Error');
    }
};
