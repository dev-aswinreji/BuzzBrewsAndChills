import {findAllProductsForUser, findAllProductsForUserSortingHighToLow, findAllProductsForUserSortingLowToHigh} from "../../../data/products/find.mjs"


export const user_shopGet = async (req, res) => {
    try {
        const sortOption = req.query.sortOption
        let products;
        switch (sortOption) {
            case 'priceLowHigh':
                products = await findAllProductsForUserSortingLowToHigh();
                break;
            case 'priceHighLow':
                products = await findAllProductsForUserSortingHighToLow();
                break;
            // Add more cases for other sorting options if needed
            case 'default':
                products = await findAllProductsForUser()
                break;
            default:
                products = await findAllProductsForUser(); // Default sorting
                break;
        }
        res.render('shop', {products})

    } catch (error) {

        console.error(error, 'USER SHOP GET')
    }

}
