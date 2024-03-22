import { findAdmin } from "../../../data/admin/find.mjs"
import { compareHashPassword } from "../../../utils/password-hashing.mjs"


export const admin_signinGet = async (req, res) => {
    if (req.session.isAdminAuthenticated) {
        res.redirect('/dashboard')
    } else {
        res.render('adminSignin')
    }
}


export const admin_signinPost = async (req, res) => {
    const adminData = {
        email: req.body.email,
        password: req.body.password
    }

    console.log(adminData)
    

    const adminDataFromDB = await findAdmin(adminData.email)

    const isPass = await compareHashPassword(adminData.password,adminDataFromDB.password)
    console.log(isPass,'compared password ')
    if(isPass === true){
        req.session.isAdminAuthenticated = true
        res.render('dashboard')
    }else{
        res.redirect('/admin')
    }
}