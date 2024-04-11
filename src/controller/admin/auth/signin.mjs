import { findAdmin } from "../../../data/admin/find.mjs"
import { compareHashPassword } from "../../../utils/password-hashing.mjs"
import { checkDataDuplication } from "../../../validation/checking-duplicateData.mjs"

export const admin_signinGet = async (req, res) => {
    try {

        if (req.session.isAdminAuthenticated) {
            res.redirect('/dashboard')
        } else {
            const messageAdmin = req.session.adminMessage 
            res.render('adminSignin',{messageAdmin})
        }

    } catch (error) {
        console.log(error.message, 'ADMIN SIGNIN GET');
    }
}


export const admin_signinPost = async (req, res) => {

    try {

        const adminData = {
            email: req.body.email,
            password: req.body.password
        }

        
        
        console.log(adminData)
        
        
        const adminDataFromDB = await findAdmin(adminData.email)
        
        const adminValid = await checkDataDuplication(adminDataFromDB)
        
        if (adminValid === 'NOT EXIST') {
            req.session.adminMessage = 'Invalid Entry'
            return res.redirect('/admin')
        }

        const isPass = await compareHashPassword(adminData.password, adminDataFromDB.password)
        console.log(isPass, 'compared password ')
        if (isPass === true) {
            req.session.isAdminAuthenticated = true
            res.render('dashboard')
        } else {
            res.redirect('/admin')
        }

    } catch (error) {
        console.log(error.message, 'ADMIN SIGNIN POST')
    }
}