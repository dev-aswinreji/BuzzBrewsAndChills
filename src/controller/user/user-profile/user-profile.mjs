import { findUserUsingIdAndPopulateAddress } from "../../../data/users/find.mjs"


export const user_profileGet = async (req,res)=>{
   const {USER_ID} =  req.session
   console.log(USER_ID);
   const user = await findUserUsingIdAndPopulateAddress(USER_ID)
   console.log(user,'user data is showing');
    res.render('user-profile',{user})
}