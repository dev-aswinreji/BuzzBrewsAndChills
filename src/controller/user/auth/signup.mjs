import { findUser } from "../../../data/users/find.mjs"
import { sendEmailForNewUser } from "../../../utils/otp-email-verification.mjs"
import { otpGenForNewUser } from "../../../utils/otp-generator.mjs"
import { hashPassword } from "../../../utils/password-hashing.mjs"
import validator from 'email-validator'
import { checkDataDuplication } from "../../../validation/checking-duplicateData.mjs"

export const user_signupGet = async (req, res) => {
    try {
        if (req.session.isUserAuth) {
            res.redirect('/home')
        } else {

            console.log('signup get is working')
            const singupErrorMessage = req.session.emailValidation || req.session.emailExist
            res.render('signup', { errors: singupErrorMessage })

        }

    } catch (error) {
        console.error(error, 'USER SIGNUP GET')
    }
}

export const user_signupPost = async (req, res) => {

    console.log('signup post is working')
    try {

        if (!validator.validate(req.body.email)) {
            console.log('inside email validator')
            req.session.emailValidation = 'email id is not valid'
            return res.redirect('/signup')
        }

        const hash = await hashPassword(req.body.password)
        console.log(hash, 'password is hashed')
        console.log(req.body);
        const { fullName, lastName, email } = req.body

        const timeStamp = new Date().getTime()

        req.session.userTemporaryData = { fullName, lastName, email, hash, timeStamp }
        console.log(req.session.userTemporaryData);

        const user = await findUser(email)

        if (await checkDataDuplication(user) === 'EXIST') {
            req.session.emailExist = 'email already exist try again with other one'
            res.redirect('/signup')

        } else {

            const OTP = await otpGenForNewUser()
            console.log(OTP)
            req.session.otpForNewUser = OTP

            sendEmailForNewUser(email, fullName, OTP)

            res.redirect('/otp-verification')

            console.log('otp verfication working')
        }

    } catch (error) {
        console.log(error, 'USER SIGNUP POST')
    }


}

