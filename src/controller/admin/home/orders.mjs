

export const admin_ordersGet = async(req,res)=>{
    if(req.session.isAdminAuthenticated){

        res.render('orders')

    }else{
        res.redirect('/admin')
    }
}