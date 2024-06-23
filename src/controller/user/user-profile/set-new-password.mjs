import { updateUserPasswordUsingId } from "../../../data/users/update.mjs"
import { hashPassword } from "../../../utils/password-hashing.mjs";

export const user_setNewPasswordGet = async (req,res)=>{
    
    const  userId = req.query.id
    console.log(userId,'i got the userid using query');
    res.render('set-new-password',{userId})
}

export const user_setNewPasswordPost = async (req,res) =>{
    const userId = req.query.id
    console.log(userId,'i got user id using post method also');
    const newPasswordpassword = req.body.password 
    const password = await hashPassword(newPasswordpassword)
    console.log(password);
   
    await updateUserPasswordUsingId(userId,password)
    res.redirect('/user-profile')
}