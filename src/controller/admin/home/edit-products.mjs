import { findSingleProduct } from "../../../data/products/find.mjs"
import { updateProducts } from "../../../data/products/update.mjs"
import { productCollection } from "../../../model/product.mjs"


export const admin_editProductsGet = async (req, res) => {
    try {
        if(req.session.isAdminAuthenticated){
        const param = req.params.id
        console.log(param)
        const product = await findSingleProduct(param)
        console.log(product, 'single product is logged ');
        res.render('edit-products', { product })
        }else{
        res.redirect('/admin/signin')
        }

    } catch (error) {
        console.log(error)
    }
}


export const admin_editProductsPost = async (req, res) => {

    try {
        const data = {
            name: req.body.product_name,
            category:req.body.category,
            description:req.body.product_description,
            price:req.body.price
        }
        console.log(req.body.productId);
        const id = data.productId

        updateProducts()

    } catch (error) {
        console.error(error)
    }
}

