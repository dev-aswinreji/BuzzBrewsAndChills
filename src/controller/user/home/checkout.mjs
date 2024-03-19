import Swal from "sweetalert2";
import { findUser } from "../../../data/users/find.mjs";
import { insertUserAddress } from "../../../data/users/insert.mjs";
import { updateUser } from "../../../data/users/update.mjs";



export const user_checkoutGet = (req, res) => {
    if(req.session.isAuth){
        res.render('checkout')
    }else{
        Swal.fire({
            title:'Warning',
            text:'Login To Continue',
            icon:'warning'
        })
        res.redirect('/signin')
    }
}
export const user_addressPost = async (req, res) => {
    const data = {
        name: req.body.name,
        phonenumber: req.body.phonenumber,
        area: req.body.area,
        city: req.body.city,
        country: req.body.country,
    }

    const userAddress = await insertUserAddress(data)
    console.log(userAddress, 'userAddress is ==============')
    console.log(userAddress[0]._id, 'userAddress id is ==============')


    const userEmail = req.session.userEmailForAddUserAddress
    console.log(userEmail, 'userEmail is ?')


    const user = await findUser(userEmail)
    console.log(user, 'user data is found ===================')


    const success = await updateUser(user.email, userAddress[0]._id)
    console.log(success)

    res.redirect('/checkout')

}