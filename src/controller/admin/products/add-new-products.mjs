import { findCategory, findUniqueCategory } from "../../../data/products/find.mjs"
import { insertNewProducts } from "../../../data/products/insert.mjs"
import sharp from 'sharp'



export const admin_addNewProductsGet = async (req, res) => {

    try {

        if (req.session.isAdminAuthenticated) {
            const category = await findCategory()
            const error = req.session.productError
            res.render('addNewProducts', { category ,error })
            req.session.productError = ''
        } else {
            res.redirect('/admin')
        }

    } catch (error) {
        console.log(error, 'ADMIN ADD NEW PRODUCTS GET');
    }
}


export const admin_addNewProductsPost = async (req, res) => {

    try {
       
        const file = req.files
        console.log(file,'file is showing or not ');
        
        const categoryName = req.body.category
        const category = await findUniqueCategory(categoryName)
        let imageUrl = []
        let count = 0
        let imageValidating ;
        for(const file of req.files){
            imageValidating = await validateImage(file.path)
            console.log(imageValidating);
            if(imageValidating){
                imageUrl[count] = file.filename
                  count++
            }else{
                req.session.productError = 'Image validate error'
                return res.redirect('/admin/add-new-products')
            }
        }
        const categoryDiscount = category.discount
        console.log(categoryDiscount,'category discount is showing ');
        const productDiscount = Number(req.body.discount) || 0
        const discount = categoryDiscount < productDiscount ? productDiscount : categoryDiscount
        console.log(discount,'discount is showing');
        const price = Number(req.body.price )
        console.log(discount)
        console.log(price,'price is showing');
        const discount_price = price - (price * discount / 100)
        console.log(discount_price)
        
        
        const product_data = {
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            category:category,
            stock:req.body.stock,
            imageUrl:imageUrl,
            discount:productDiscount,
            discount_price:discount_price
        }

        console.log(imageUrl,'imageurl Multiple ');

        // const product_data = {name,description,price,category,stock,imageUrl}
        // console.log(product_data,'product data is showing successfully');
        
        await insertNewProducts(product_data)
        res.redirect('/admin/add-new-products')

    } catch (error) {
        console.log(error,'ADMIN ADD NEW PRODUCTS POST');
    }
}


async function validateImage(filename) {
    try {
        // Read the image file and get its metadata
        const metadata = await sharp(filename).metadata();
        
        // Validate based on metadata, you can add more checks if needed
        if (metadata.format && metadata.width && metadata.height) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error validating image:', error);
        return false;
    }
}
