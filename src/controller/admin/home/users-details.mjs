

const admin_usersDetailsGet = async (req,res) => {
    try {
        
        if(req.session.isAdminAuthenticated){
    
            res.render('profileDetails')
    
        }else{
            res.redirect('/admin')
        }
        
    } catch (error) {
        console.log(error,'ADMIN USER DETAILS GET');
    }
}