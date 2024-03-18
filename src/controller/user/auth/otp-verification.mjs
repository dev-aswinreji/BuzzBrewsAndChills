import { insertUser } from "../../../data/users/insert.mjs";


export const user_otpVerificationPost = async (req,res)=>{
    const token_check = req.body.otp ;
    const token_link = req.query.token_check
    console.log('veri')
    console.log(req.session.OTP, 'created otp')
    console.log(req.body.otp ,  'user recieved otp')
    console.log('fication')

    try {
 
        if(token_check===req.session.OTP ){
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