import { findUserAddressUsingIdAndPopulate } from "../../../data/users/find.mjs";


export const user_addressGet = async (req,res)=>{
    try {
        const userId = req.session.USER_ID
        const userAddresses = await findUserAddressUsingIdAndPopulate(userId)
        console.log(userAddresses,'addresses')
        res.render('address',{userAddresses})
        
    } catch (error) {
        console.log(error,'USER ADDRESS GET');
    }
}