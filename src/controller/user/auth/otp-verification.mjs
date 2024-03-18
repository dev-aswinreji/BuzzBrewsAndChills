import { insertUser } from "../../../data/users/insert.mjs";


export const user_otpVerificationPost = async (req,res)=>{
    const token_check = req.body.otp ;
    const token_link = req.query.token_check
    console.log('veri')
    console.log(req.session.otpForNewUser, 'created otp')
    console.log(req.body.otp ,  'user recieved otp')
    console.log('fication')
    
    console.log('email-ver')
    console.log(req.session.otpForForgotPassword, 'created otp')
    console.log(req.body.otp ,  'user recieved otp')
    console.log('fication was successfull')

    try {

        if(token_check===req.session.otpForForgotPassword){
            res.render('forgot-password')
        }
 
        if(token_check===req.session.otpForNewUser ){
            const userdata = req.session.userTemporaryData
            await insertUser(userdata)
            res.redirect('/home')
        }else{
            res.redirect('/otp-verification')
        }

    } catch (error) {
        console.log(error.message)
    }


}