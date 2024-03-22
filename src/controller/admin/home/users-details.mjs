

const admin_usersDetailsGet = async (req,res) => {
    if(req.session.isAdminAuthenticated){

        res.render('profileDetails')

    }else{
        res.redirect('/admin')
    }
}