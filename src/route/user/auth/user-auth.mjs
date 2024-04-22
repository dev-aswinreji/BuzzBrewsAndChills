import express from 'express'
import {user_signupGet, user_signupPost} from '../../../controller/user/auth/signup.mjs'
import {user_otpVerificationGet, user_otpVerificationPost, user_otpVerificationResentOtpGet} from '../../../controller/user/auth/otp-verification.mjs'
import {user_signinGet, user_signinPost} from '../../../controller/user/auth/signin.mjs'
import {user_forgotPasswordPost} from '../../../controller/user/auth/forgot-password.mjs'
import {user_emailVerificationGet, user_emailVerificationPost} from '../../../controller/user/auth/email-verification.mjs'
import {user_signoutGet} from '../../../controller/user/auth/signout.mjs'


const route = express.Router()

route.get('/signup', user_signupGet)
route.post('/signup', user_signupPost)

route.get('/otp-verification', user_otpVerificationGet)
route.post('/otp-verification', user_otpVerificationPost)
route.get('/otp-verification/resend-otp', user_otpVerificationResentOtpGet)

route.get('/email-verification', user_emailVerificationGet)
route.post('/email-verification', user_emailVerificationPost)

route.post('/forgot-password', user_forgotPasswordPost)

route.get('/signin', user_signinGet)
route.post('/signin', user_signinPost)

route.get('/signout', user_signoutGet)


export default route
