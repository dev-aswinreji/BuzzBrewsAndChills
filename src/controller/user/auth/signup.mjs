
import { findUser } from "../../../data/users/find.mjs"
import { sendEmailForNewUser } from "../../../utils/otp-email-verification.mjs"
import { otpGenForNewUser } from "../../../utils/otp-generator.mjs"
import { hashPassword } from "../../../utils/password-hashing.mjs"
import { emailValidation } from "../../../validation/email-validation.mjs"
import { nameValidation } from "../../../validation/name-validataion.mjs"
import { samePasswordValidation } from "../../../validation/same-pass-validation.mjs"

export const user_signupGet = async (req, res) => {
    console.log('signup get is working')
    res.render('signup')
}

export const user_signupPost = async (req, res) => {
    
    console.log('signup post is working')
    try {
        
        const validation = {
            Fname:req.body.full_name,
            Lname:req.body.last_name,
            email:req.body.email,
            password:req.body.password,
            confirmPassword:req.body.confirm_password
        }
        // const samePass = await samePasswordValidation(validation.password,validation.confirmPassword)
        if(!samePasswordValidation(validation.password,validation.confirmPassword)){
            console.log('password checking working')
            return res.redirect('/signup')
        }
        if(!emailValidation(validation.email)){
            console.log('email verfication is working')
            return res.redirect('/signup')
        }
        if(!nameValidation(validation.Fname)){
            return res.redirect('/signup')
        }
        
        
        const hash = await hashPassword(req.body.password)
        console.log(hash,'password is hashed')

        const data = {
            full_name: req.body.fullname,
            last_name: req.body.lastname,
            email: req.body.email,
            password: hash,
            enum:'USER',
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