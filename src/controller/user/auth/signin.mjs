import jwt from "jsonwebtoken"
import { findUser } from "../../../data/users/find.mjs"
import { compareHashPassword } from "../../../utils/password-hashing.mjs"
import { checkDataDuplication } from "../../../validation/checking-duplicateData.mjs"

export const user_signinGet = (req, res) => {

    try {

        if (req.session.isUserAuth) {
            res.redirect('/home')
        } else {
            const errMessage = req.session.message
            res.render('signin', { errMessage })
        }

    } catch (error) {
        console.log(error, 'USER SIGNIN GET')
    }
}
export const user_signinPost = async (req, res) => {

    try {

        const data = {
            email: req.body.email,
            password: req.body.password
        }
        const userAuth = await findUser(data.email)
        const userData = await checkDataDuplication(userAuth)
        
        if (userData === 'NOT EXIST') {
            req.session.message = 'Invalid User Entry Please Try to Signin'
            return res.redirect('/signin')
        }
        
        req.session.userEmailForAddUserAddress = userAuth.email
        
        const pass = await compareHashPassword(data.password, userAuth.password)
        console.log(pass)
        
        if (data.email === userAuth.email && pass === true && userAuth.accountStatus === 'ACTIVE') {
            req.session.USER_ID = userAuth._id
            req.session.isUserAuth = true
            const token = jwt.sign({ userId: userAuth._id }, process.env.JWT_SECRET_KEY, {
                expiresIn: '1h',
            })
            res.status(200)
            res.redirect('/home')
        } else {
            req.session.message = 'Invalid Entry or Account is Blocked'
            res.redirect('/signin')
        }

    } catch (error) {
        res.status(500).json({ error: 'Login Failed' })
        console.error(error, 'USER SIGNIN POST')
    }

}
