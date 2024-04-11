import { findAllProducts, findAllProductsForUser } from "../../../data/products/find.mjs"
import { productCollection } from "../../../model/product.mjs"



export const user_shopGet = async (req, res) => {
    try {

        const productImages = await findAllProductsForUser()
        console.log(productImages);
        res.render('shop', { data: productImages })

    } catch (error) {

        console.error(error)
    }

}