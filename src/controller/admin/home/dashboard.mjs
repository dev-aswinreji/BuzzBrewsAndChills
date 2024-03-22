

export const admin_dashboardGet = async (req,res) =>{
    if(req.session.isAdminAuthenticated){

        res.render('dashboard')

    }else{
        res.redirect('/admin')
    }
}