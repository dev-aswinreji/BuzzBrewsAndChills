import { productImages } from "../../images/shopImages.mjs"


export const user_shopGet = async(req,res)=>{
    res.render('shop',{data:productImages})
}