import { findCategory, findUniqueCategory } from "../../../data/products/find.mjs"
import { insertCategoryForProducts } from "../../../data/products/insert.mjs"
import { checkDataDuplication } from "../../../validation/checking-duplicateData.mjs"



export const admin_categoriesGet = async (req, res) => {
    try {
        
        if (req.session.isAdminAuthenticated) {
    
            const category = await findCategory()
            const message = req.session.categoryError
            res.render('categories', { category ,message})
        } else {
            res.redirect('/admin')
        }
    } catch (error) {
        console.log(error,'ADMIN CATEGORY GET');
    }
}


export const admin_categoriesPost = async (req, res) => {
    try {
        
        const data = {
            name: req.body.name,
            description: req.body.description,
        }
       const isUnique = await findUniqueCategory(data.name)
       console.log(isUnique);
       let result = await checkDataDuplication(isUnique) 
       console.log(result);

       if(result === 'EXIST'){
        req.session.categoryError = 'Category already existing'
         res.redirect('/admin/category')
       }else{
           await insertCategoryForProducts(data)
           res.redirect('/admin/category')
       }
    
    } catch (error) {
        console.log(error,'ADMIN CATEGORY POST');
    }
}


export const admin_categoriesEditGet = async(req,res)=>{
    res.render()
}