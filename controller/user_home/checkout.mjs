// import { userAddressCollection } from "../../model/userAddress.mjs";
// import { userData } from "../../mongodbMethods/users/find/find.mjs";
// import { insertUserAddress } from "../../mongodbMethods/users/insert/insert.mjs";


// export const user_addressGet = (req,res)=>{
//     res.render('checkout')
// }
// export const user_addressPost = async (req,res)=>{
//     const email = req.body.email
//     const userdatas = await userData(email)
//     const data = {
//         email:req.body.email,
//         phonenumber: req.body.phonenumber,
//         area: req.body.area,
//         city: req.body.city,
//         addressId:userdatas
        
//     }

//     await insertUserAddress(data)

//     console.log(await userAddressCollection.find({}))
    

//     console

//     res.redirect('/checkout')
    
// }