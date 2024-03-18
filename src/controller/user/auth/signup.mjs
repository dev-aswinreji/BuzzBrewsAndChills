
import { findUser } from "../../../data/users/find.mjs"
import { sendEmail } from "../../../utils/otpEmailVerification.mjs"
import { otpGen } from "../../../utils/otpGenerator.mjs"
import { hashPassword } from "../../../utils/passwordHashing.mjs"

export const user_signupGet = async (req, res) => {
    res.render('signup')
}

async function isNull(data) {
    const emailExist = await findUser(data.email)
    if (emailExist === null) {
        return false
    }
    if (data.email === emailExist.email) {
        return true
    }

}

export const user_signupPost = async (req, res) => {

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

            const OTP = otpGen()
            console.log(OTP)

            req.session.otpForNewUser = OTP

            sendEmail(data.email, data.full_name, OTP)

            res.render('otpVerification')

            console.log('otp verfication working')
        }

    } catch (error) {
        console.log(error)
    }



}

