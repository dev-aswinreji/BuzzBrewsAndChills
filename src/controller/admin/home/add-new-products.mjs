import { findCategory, findUniqueCategory } from "../../../data/products/find.mjs"
import { insertNewProducts } from "../../../data/products/insert.mjs"


export const admin_addNewProductsGet = async (req, res) => {

    try {

        if (req.session.isAdminAuthenticated) {
            const category = await findCategory()
            res.render('addNewProducts', { category })

        } else {
            res.redirect('/admin')
        }

    } catch (error) {
        console.log(error, 'ADMIN ADD NEW PRODUCTS GET');
    }
}


export const admin_addNewProductsPost = async (req, res) => {

    try {
        console.log(req.query,'what is working here');
        // console.log(req.body)
        console.log(req.body,'req.body is ');
        console.log(req.body.data);
        console.log(req.body.formData);
        console.log(req.body.croppedImage,'cropped images is showing');
        const categoryName = JSON.parse(JSON.stringify(req.body.category))
        console.log(FormData,'formData is what');
    
        // const categoryData = await findUniqueCategory(categoryName)
        console.log(req.files,'req.files is working');

        let imageUrl = []
        let count = 0
        for(const file of req.files){
            imageUrl[count] = file.filename
            count++
        }

        console.log(imageUrl,'imageurl Multiple ');
        const {name,description,price,stock} = JSON.parse(JSON.stringify(req.body))

        const category = await findUniqueCategory(categoryName)

        const product_data = {name,description,price,category,stock,imageUrl}
        console.log(product_data,'product data is showing successfully');
        
        await insertNewProducts(product_data)
        res.redirect('/admin/add-new-products')

    } catch (error) {
        console.log(error,'ADMIN ADD NEW PRODUCTS POST');
    }
}