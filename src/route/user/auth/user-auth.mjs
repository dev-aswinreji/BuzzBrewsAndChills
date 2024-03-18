import express from 'express'
import { user_signupGet } from '../../../controller/user/auth/signup.mjs'
import { user_otpVerificationPost } from '../../../controller/user/auth/otp-verification.mjs'
import { user_signinGet, user_signinPost } from '../../../controller/user/auth/signin.mjs'
import { user_googleVerification, user_googleVerificationCallback } from '../../../controller/user/auth/google-vefication.mjs'


const route = express.Router()


route.get('/auth/google',user_googleVerification)
route.get('/auth/google/callback',user_googleVerificationCallback)

route.get('/signup',user_signupGet)
route.post('/signup',user_signupGet)

route.post('/otp-verification',user_otpVerificationPost)



route.get('signin',user_signinGet)
route.post('signin',user_signinPost)









export default route