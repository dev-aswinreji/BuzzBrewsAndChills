
export const admin_authentication = async (req,res,next)=>{
  if(req.session.isAdminAuthencticated){
    next()
  }else{
    res.redirect('/admin/signin')
  }
}
