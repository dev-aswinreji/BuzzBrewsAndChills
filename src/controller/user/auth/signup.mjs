
import { findUser } from "../../../data/users/find.mjs"
import { sendEmailForNewUser } from "../../../utils/otpEmailVerification.mjs"
import { otpGenForNewUser } from "../../../utils/otpGenerator.mjs"
import { hashPassword } from "../../../utils/passwordHashing.mjs"

export const user_signupGet = async (req, res) => {
    console.log('signup get is working')
    res.render('signup')
}

async function isNull(data) {
    console.log('is null is working')
    const emailExist = await findUser(data.email)
    if (emailExist === null) {
        return false
    }
    if (data.email === emailExist.email) {
        return true
    }

}

export const user_signupPost = async (req, res) => {

        console.log('signup post is working')
    try {

        const hash = await hashPassword(req.body.password)

        const data = {
            full_name: req.body.fullname,
            last_name: req.body.lastname,
            email: req.body.email,
            password: hash,
        }
        console.log(hash)

        req.session.userTemporaryData = data

        if (await isNull(data) === true) {
            res.redirect('/signup')

        } else {

            const OTP = await otpGenForNewUser()
            console.log(OTP)

            req.session.otpForNewUser = OTP

            sendEmailForNewUser(data.email, data.full_name, OTP)

            res.render('otpVerification')

            console.log('otp verfication working')
        }

    } catch (error) {
        console.log(error)
    }



}

