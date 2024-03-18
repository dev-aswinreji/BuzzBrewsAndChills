import { findUser } from "../../../data/users/find.mjs"
import { otpGen } from "../../../utils/otpGenerator.mjs"




export const email_verificationGet = async (req,res)=>{
    res.render('emailVerification')
}

export const email_verificationPost = async (req,res)=>{
    

    const userData = await findUser(data.email)

    if(userData===null){
        req.redirect('/email-verification')
    }
    else{
        const OTP = await otpGen()
        req.session.otpForForgotPassword = OTP
        res.redirect('/otp-verification')
    }



}
