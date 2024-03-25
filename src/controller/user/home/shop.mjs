import { productCollection } from "../../../model/product.mjs"



export const user_shopGet = async (req, res) => {
    try {

        const productImages = await productCollection.find()
        res.render('shop', { data: productImages })

    } catch (error) {

        console.error(error)
    }

}

