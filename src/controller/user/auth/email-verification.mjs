import { findUser } from "../../../data/users/find.mjs"
import { sendEmailForForgotPassword } from "../../../utils/otpEmailVerification.mjs"
import { otpGenForForgotPassword } from "../../../utils/otpGenerator.mjs"




export const user_emailVerificationGet = async (req,res)=>{
    res.render('emailVerification')
}

export const user_emailVerificationPost = async (req,res)=>{
    
    const data = req.body.email

    const userData = await findUser(data)

    if(userData===null){
        req.redirect('/email-verification')
    }
    else{
        req.session.userEmailForChangePassword = userData.email
        const OTP = await otpGenForForgotPassword()
        sendEmailForForgotPassword(userData.email,userData.full_name,OTP)

        console.log(OTP)
        req.session.otpForForgotPassword = OTP
        res.render('otpVerification')
    }



}
