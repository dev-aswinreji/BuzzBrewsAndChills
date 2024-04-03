import { insertUser } from "../../../data/users/insert.mjs";
import { sendEmailForNewUser } from "../../../utils/otp-email-verification.mjs";
import { otpGenForNewUser } from "../../../utils/otp-generator.mjs";


export const user_otpVerificationGet = async (req,res) => {
    const errorOtp =  req.session.newUserOtpError || req.session.resetPasswordOtp
    res.render('otpVerification',{errorOtp})
}

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

        const isOtpNewUser = await otpForNewUser(token_check, otpFromSessionForNewUser)
        const resendOtp = req.session.resendOtp
    
        if (isOtpNewUser === true || resendOtp === token_check) {
            console.log('otp verfication is working');
            const userdata = req.session.userTemporaryData
            req.session.userEmailForAddUserAddress = userdata.email
            await insertUser(userdata)
            req.session.isAuth = true
            console.log('authentication is true');
            res.redirect('/home')
        }
        
         if(isOtpNewUser || isOtpForgotPass === false) {
            req.session.newUserOtpError = 'Entered otp is invalid'
            res.redirect('/otp-verification')
        }

    } catch (error) {
        console.log(error.message)
    }

} 


export const user_otpVerificationResentOtpPost = async (req,res)=>{
     const userdata = req.session.userTemporaryData
    
     const OTP = await otpGenForNewUser()
     req.session.resendOtp = OTP
     console.log(OTP)
    sendEmailForNewUser(userdata.email,userdata.fullname,OTP)
   res.redirect('/otp-verification')
 }

async function otpForNewUser(token_check, isOtpNewUser) {

    if (token_check === isOtpNewUser) {
        return true
    }else{
        return 
    }

}

async function otpForForgotPassword(token_check, otpFromSessionForForgotPassword) {
    if (token_check === otpFromSessionForForgotPassword) {
        return true
    }
    return false
}

