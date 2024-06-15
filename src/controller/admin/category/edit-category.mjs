import { ObjectId } from "mongodb";
import { findUniqueCategory, findUniqueCategoryUsingId } from "../../../data/products/find.mjs"
import { updateCategory } from "../../../data/products/update.mjs";
import { checkDataDuplication } from "../../../validation/checking-duplicateData.mjs";
import { updateProductOfferAccordingToCategoryUpdate } from "../../../data/offer/update-offer.mjs";


export const admin_editCategoryGet = async (req,res)=>{
    const categoryId = req.params.id
    const category = await findUniqueCategoryUsingId(categoryId)
    console.log(category);
    const error = req.session.editCategoryError
    res.render('edit-category',{category,error})
}

export const admin_editCategoryPost = async (req,res)=>{
    const categoryId = req.params.id
    console.log(categoryId,'category id is showing ')
    console.log( new ObjectId(categoryId) ,' type of category id');;
    const categoryData = {
        name:req.body.name,
        description:req.body.description,
        discount:req.body.discount
    }
    const category = await findUniqueCategoryUsingId(categoryId)
    console.log(category,'category');
    console.log( category._id,'category.id id is showing');
    console.log(new ObjectId(categoryId.toString()).equals(category._id),'what is happe')
    const isDuplicateCategory = await findUniqueCategory(categoryData.name)
    console.log(isDuplicateCategory,'isDuplicateCategory');
    const result = await checkDataDuplication(isDuplicateCategory)
    if(category._id.equals(new ObjectId(categoryId).toString()) || result === 'NOT EXIST'){
        await updateCategory(categoryId,categoryData)
        await updateProductOfferAccordingToCategoryUpdate(category._id)
        res.redirect('/admin/category')
    }else{
        req.session.editCategoryError = 'Category already exist'
        res.redirect(`/admin/edit-category/${categoryId}`)
    }
}