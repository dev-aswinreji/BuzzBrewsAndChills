import { insertNewProducts } from "../../../data/products/insert.mjs"


export const admin_addNewProductsGet = async (req,res)=>{
    if(req.session.isAdminAuthenticated){

        res.render('addNewProducts')

    }else{
        res.redirect('/admin')
    }
}


export const admin_addNewProductsPost = async (req,res) => {
    const product_data = {
        name:req.body.product_name,
        description:req.body.product_description,
        price:req.body.product_price,
        category:req.body.product_category,
        stock:req.body.product_stock,
        imageUrl:req.file.filename
    }
    await insertNewProducts(product_data)
    res.redirect('/admin/add-new-products')
}