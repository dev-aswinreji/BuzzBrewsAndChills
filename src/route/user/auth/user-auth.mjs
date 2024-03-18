import express from 'express'
import { user_signupGet, user_signupPost } from '../../../controller/user/auth/signup.mjs'
import { user_otpVerificationPost } from '../../../controller/user/auth/otp-verification.mjs'
import { user_signinGet, user_signinPost } from '../../../controller/user/auth/signin.mjs'
import { user_googleVerification, user_googleVerificationCallback } from '../../../controller/user/auth/google-vefication.mjs'
import { user_forgotPassword } from '../../../controller/user/auth/forgot-password.mjs'
import { user_emailVerificationGet, user_emailVerificationPost } from '../../../controller/user/auth/email-verification.mjs'


const route = express.Router()


route.get('/auth/google',user_googleVerification)
route.get('/auth/google/callback',user_googleVerificationCallback)

route.get('/signup',user_signupGet)
route.post('/signup',user_signupPost)

route.post('/otp-verification',user_otpVerificationPost)

route.get('/email-verification',user_emailVerificationGet)
route.post('/email-verification',user_emailVerificationPost)

route.post('/forgot-password',user_forgotPassword)

route.get('/signin',user_signinGet)
route.post('/signin',user_signinPost)





export default route