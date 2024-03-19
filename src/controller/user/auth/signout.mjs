

export const user_signoutGet = async (req,res)=>{
    req.session.destroy()
    res.redirect('/signin')
}