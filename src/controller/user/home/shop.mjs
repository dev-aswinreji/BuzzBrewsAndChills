import { productImages } from "../../../images/shopImages.mjs"
import { productCollection } from "../../../model/admin-entities/product.mjs"



export const user_shopGet = async(req,res)=>{
    const productImages = await productCollection.find()
    res.render('shop',{data:productImages})
}