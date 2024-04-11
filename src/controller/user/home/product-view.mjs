import { findAllProducts, findSingleProduct } from "../../../data/products/find.mjs"


export const user_productView = async (req, res) => {
    const productId = req.params.id
    console.log(productId,'iam the product id');
  
    const product = await findSingleProduct(productId)
    console.log(product.category,'======================================================>product category<================================')
    const relatedProduct = await findAllProducts(product.category)
    console.log(relatedProduct,'================================================>related product<======================');
    console.log(product,'really');
    res.render('product-view',{product,relatedProduct})
}