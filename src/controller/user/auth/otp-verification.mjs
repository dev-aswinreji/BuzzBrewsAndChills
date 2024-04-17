import { insertUser } from "../../../data/users/insert.mjs";
import { sendEmailForNewUser } from "../../../utils/otp-email-verification.mjs";
import { otpGenForNewUser } from "../../../utils/otp-generator.mjs";
import { otpVerificationForForgotPasswordUser, otpVerificationForNewUser, otpVerificationForUser } from "../../../validation/otp-verification.mjs";


export const user_otpVerificationGet = async (req, res) => {
    try {

        if (req.session.isUserAuth) {
            res.redirect('/home')
        } else {

            const errorOtp = req.session.newUserOtpError || req.session.resetPasswordOtp
            res.render('otpVerification', { errorOtp })

        }

    } catch (error) {
        console.log(error, 'USER OTP VERIFICATION POST');
    }
}

export const user_otpVerificationPost = async (req, res) => {
    const token_check = req.body.otp;
    const token_link = req.query.token_check

    try {


        const otpFromSessionForNewUser = req.session.otpForNewUser
        console.log(otpFromSessionForNewUser, 'session otp ');
        const otpFromSessionForForgotPassword = req.session.otpForForgotPassword
        const resendOtp = req.session.resendOtp

        
        const isOtpNewUser = await otpVerificationForNewUser(token_check, otpFromSessionForNewUser)
        console.log(isOtpNewUser);
        const isOtpForgotPass = await otpVerificationForForgotPasswordUser(token_check, otpFromSessionForForgotPassword)
        const isResendOtp = await otpVerificationForUser(token_check, resendOtp)

        if (isOtpForgotPass === true) {
            res.render('forgotPassword')
        }

        if (isOtpNewUser || isResendOtp === true) {
            console.log('otp verfication is working');
            const userdata = req.session.userTemporaryData
            req.session.userEmailForAddUserAddress = userdata.email
            await insertUser(userdata)
            req.session.isUserAuth = true
            console.log('authentication is true');
            return res.redirect('/home')
        }

        if (isOtpNewUser || isOtpForgotPass === false) {
            req.session.newUserOtpError = 'Entered otp is invalid'
            res.redirect('/otp-verification')
        }


        console.log(isOtpNewUser, 'below expiring function');
    } catch (error) {
        console.log(error, 'USER OTP VERIFICATION POST')
    }

}


export const user_otpVerificationResentOtpGet = async (req, res) => {
    try {

        const {email,fullName,timeStamp} = req.session.userTemporaryData
        console.log(timeStamp);
        const OTP = await otpGenForNewUser()
        console.log('resend otp working');
        req.session.otpForNewUser = OTP
        console.log(OTP)
        sendEmailForNewUser(email, fullName, OTP)
        res.redirect('/otp-verification')
    } catch (error) {
        console.error(error, 'USER RESEND OTP VERIFICATION POST')
    }
}

