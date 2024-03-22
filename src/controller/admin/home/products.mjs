

export const admin_productsGet = async (req,res) =>{
    if(req.session.isAdminAuthenticated){

        res.render('products')

    }else{
        res.redirect('/admin')
    }
} 