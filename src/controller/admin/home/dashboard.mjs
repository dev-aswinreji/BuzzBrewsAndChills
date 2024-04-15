

export const admin_dashboardGet = async (req,res) =>{

    try {
        
        if(req.session.isAdminAuthenticated){
    
            res.render('dashboard')
    
        }else{
            res.redirect('/admin')
        }
    } catch (error) {
        console.log(error,'ADMIN DASHBOARD GET');
    }
}