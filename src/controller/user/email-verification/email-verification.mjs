import { findUser } from "../../../data/users/find.mjs"
import { sendEmailForForgotPassword } from "../../../utils/otp-email-verification.mjs"
import { otpGenForForgotPassword } from "../../../utils/otp-generator.mjs"




export const user_emailVerificationGet = async (req, res) => {
    try {

        res.render('emailVerification')

    } catch (error) {
        console.error(error, 'USER EMAIL VERIFICATION GET')
    }
}

export const user_emailVerificationPost = async (req, res) => {

    try {

        const data = req.body.email

        const userData = await findUser(data)

        if (userData === null) {
            res.redirect('/email-verification')
        }
        else {
            req.session.userEmailForChangePassword = userData.email

            req.session.userTemporaryData = userData
            const OTP = await otpGenForForgotPassword()
            sendEmailForForgotPassword(userData.email, userData.full_name, OTP)

            console.log(OTP)
            req.session.otpForForgotPassword = OTP
            const errorOtp = req.session.message
            res.render('otpVerification', { errorOtp })
        }

    } catch (error) {
        console.error(error, 'USER EMAIL VERIFICATION POST')
    }
}
