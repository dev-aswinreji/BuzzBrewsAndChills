import { findAllProducts } from "../../../data/products/find.mjs";

export const admin_productsGet = async (req, res) => {
    if (req.session.isAdminAuthenticated) {

        const product = await findAllProducts()

        console.log(product[0].category, 'is this is undefined');

        // console.log(product);
        res.render('products', { product })

    } else {
        res.redirect('/admin')
    }
} 