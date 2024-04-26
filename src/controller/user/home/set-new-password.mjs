import { updateUserPassword } from "../../../data/users/update.mjs"

export const user_setNewPasswordGet = async (req,res)=>{
    
    const  userId = req.query.id
    console.log(userId,'i got the userid using query');
    res.render('set-new-password',{userId})
}

export const user_setNewPasswordPost = async (req,res) =>{
    const userId = req.query.id
    console.log(userId,'i got user id using post method also');
    const password = req.body.password 
    const email = req.query.email
    await updateUserPassword(email,password)
    res.redirect('/user-profile')
}