import { findUserUsingId } from "../../../data/users/find.mjs";
import { updateUser, updateUserUsingId } from "../../../data/users/update.mjs";


export const user_updateProfileGet = async (req,res) =>{

    try {
        const userId = req.query.id 
        const user = await findUserUsingId(userId)
        console.log(user,'user data is showing properly');
        res.render('update-profile',{user})

    } catch (error) {
        console.log(error,'USER UPDATE PROFILE GET');
        res.send(500) 
    }

}

export const user_updateProfilePost = async (req,res) =>{

    try {
        
        const userId = req.query.id
        
        const userData = {
            fullName:req.body.fullName,
            lastName:req.body.lastName,
            email:req.body.email
        }
        const updatedData = await updateUserUsingId(userId,userData)
        
        res.redirect('/user-profile')

    } catch (error) {
        console.log(error,'USER UPDATE PROFILE POST');
        res.send(500)
    }

}