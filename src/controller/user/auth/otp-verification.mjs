import { insertUser } from "../../../data/users/insert.mjs";


export const user_otpVerificationPost = async (req, res) => {
    const token_check = req.body.otp;
    const token_link = req.query.token_check

    try {

        const otpFromSessionForForgotPassword = req.session.otpForForgotPassword

        const isOtpForgotPass = await otpForForgotPassword(token_check, otpFromSessionForForgotPassword)
        if (isOtpForgotPass === true) {
            res.render('forgotPassword')
        }

const otpFromSessionForNewUser = req.session.otpForNewUser

       
        if (isOtpNewUser === true) {
            const userdata = req.session.userTemporaryData
            req.session.userEmailForAddUserAddress = userdata.email
            await insertUser(userdata)
            req.session.isAuth = true
            res.redirect('/home')
        } else {
            res.redirect('/email-verification')
        }

    } catch (error) {
        console.log(error.message)
    }

}

async function otpForNewUser(token_check, isOtpNewUser) {

    if (token_check === isOtpNewUser) {
        return true
    }

}

async function otpForForgotPassword(token_check, otpFromSessionForForgotPassword) {
    if (token_check === otpFromSessionForForgotPassword) {
        return true
    }
    return false
}

