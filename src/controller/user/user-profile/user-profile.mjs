import { findUserAddressUsingPopulate } from "../../../data/users/find.mjs"


export const user_profileGet = async (req,res)=>{
   const userEmail =  req.session.userEmailForAddUserAddress
   console.log(userEmail);
   const user = await findUserAddressUsingPopulate(userEmail)
   console.log(user,'user data is showing');
    res.render('user-profile',{user})
}