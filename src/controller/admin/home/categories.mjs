


export const admin_categoriesGet = async (req,res)=>{
    if(req.session.isAdminAuthenticated){
        res.render('categories')
    }else{
        res.redirect('/admin')
    }
}

