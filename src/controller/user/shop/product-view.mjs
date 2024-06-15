import { findAllProducts, findRelatedProductAccordingToCategory, findSingleProduct } from "../../../data/products/find.mjs"


export const user_productView = async (req, res) => {
    try {

        const productId = req.params.id
        console.log(productId, 'iam the product id');

        const product = await findSingleProduct(productId)
        const category = product.category
        console.log(category,'category is showing ================================:::::::::::::::::::::::::::::');
        const relatedProduct = await findRelatedProductAccordingToCategory(category)
        console.log(relatedProduct, '================================================>related product<======================');
        console.log(product, 'really');
        res.render('product-view', { product, relatedProduct })

    } catch (error) {
        console.log(error, 'USER PRODUCT VIEW GET');
    }
}