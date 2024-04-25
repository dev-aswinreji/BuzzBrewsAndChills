import { findUniqueCategory, findUniqueCategoryUsingId } from "../../../data/products/find.mjs"
import { updateCategory } from "../../../data/products/update.mjs"


export const admin_manageCategory = async(req,res)=>{
    const categoryId = req.params.id
    const categoryData = await findUniqueCategoryUsingId(categoryId)
    console.log(categoryData);

    if(categoryData.availability === 'ACTIVE'){
        await updateCategory(categoryId,{availability:'UNAVAILABLE'})
    }else{
        await updateCategory(categoryId,{availability:'ACTIVE'})
    }
    res.json({id:categoryId})
}