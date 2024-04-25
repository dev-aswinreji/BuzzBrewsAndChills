import { findUniqueCategory, findUniqueCategoryUsingId } from "../../../data/products/find.mjs"
import { updateCategory } from "../../../data/products/update.mjs";
import { checkDataDuplication } from "../../../validation/checking-duplicateData.mjs";


export const admin_editCategoryGet = async (req,res)=>{
    const categoryId = req.params.id
    const category = await findUniqueCategoryUsingId(categoryId)
    console.log(category);
    const error = req.session.editCategoryError
    res.render('edit-category',{category,error})
}

export const admin_editCategoryPost = async (req,res)=>{
    const categoryId = req.params.id
    console.log(categoryId);
    const categoryData = {
        name:req.body.name,
        description:req.body.description
    }
    const category = await findUniqueCategoryUsingId(categoryId)
    console.log(category,'category');
    const isDuplicateCategory = await findUniqueCategory(categoryData.name)
    console.log(isDuplicateCategory,'isDuplicateCategory');
    const result = await checkDataDuplication(isDuplicateCategory)
    if(category.name === categoryData.name || result === 'NOT EXIST'){
        await updateCategory(categoryId,categoryData)
        res.redirect('/admin/category')
    }else{
        req.session.editCategoryError = 'Category already exist'
        res.redirect(`/admin/edit-category/${categoryId}`)
    }
}