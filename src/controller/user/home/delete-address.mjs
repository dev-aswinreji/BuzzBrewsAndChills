import { deleteUserAddress } from "../../../data/users/delete.mjs";


export const user_addressDeleteDelete = async (req,res)=>{
    try {

        const addressId = req.query.id 
        console.log(addressId);
        await deleteUserAddress(addressId)
        res.json({result:'success'})
    } catch (error) {
        console.log(error,'USER ADDRESS DELETE ');
    }



}