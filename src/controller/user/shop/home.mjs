import { findAllProductsForUser, findAllProductsForUserHome } from "../../../data/products/find.mjs"

export const user_homeGet = async (req, res) => {

    try {
        const products = await findAllProductsForUserHome(3)
        console.log(products,'products ');
        res.render('home',{products})

    } catch (error) {
        console.error(error, 'USER HOME GET')
    }

}
