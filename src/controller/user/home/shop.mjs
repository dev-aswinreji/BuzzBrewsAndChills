import {findAllProductsForUser} from "../../../data/products/find.mjs"


export const user_shopGet = async (req, res) => {
    try {

        const products = await findAllProductsForUser()
        console.log(products);
        res.render('shop', {products})

    } catch (error) {

        console.error(error, 'USER SHOP GET')
    }

}
