
export const admin_authentication = async (req,res,next)=>{
  if(req.session.isAdminAuthenticated){
    next()
  }else{
    res.redirect('/admin/signin')
  }
}
