import { findAllProductsForUser } from "../../../data/products/find.mjs"




export const user_shopGet = async (req, res) => {
    try {

        const productImages = await findAllProductsForUser()
        console.log(productImages);
        res.render('shop', { data: productImages })

    } catch (error) {

        console.error(error, 'USER SHOP GET')
    }

}

