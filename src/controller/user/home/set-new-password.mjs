import { updateUserPassword } from "../../../data/users/update.mjs"

export const user_setNewPasswordGet = async (req,res)=>{
    res.render('set-new-password')
}

export const user_setNewPasswordPost = async (req,res) =>{
    const password = req.body.password 
    const email = req.query.email
    await updateUserPassword(email,password)
    res.redirect('/user-profile')
}