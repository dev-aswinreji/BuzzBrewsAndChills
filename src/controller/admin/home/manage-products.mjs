import { updateProducts } from "../../../data/products/update.mjs"


export const admin_manageProducts = async (req, res) => {
    try {
        const productId = req.params.id
        const productAvailability = req.query.id

        console.log(productAvailability, 'productAvailability')  //type is String productAvailability
        console.log(productId, 'productId');


        if (productAvailability === "AVAILABLE") {
            await updateProducts(productId, { availability: 'UNAVAILABLE' })
        }
        else {
            await updateProducts(productId, { availability: 'AVAILABLE' })
        }

        res.redirect('/admin/products')

    } catch (error) {
        console.log(error, 'ADMIN MANAGE PRODUCTS');
    }

}