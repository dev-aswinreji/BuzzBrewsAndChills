import express from 'express'
import {user_otpVerificationGet, user_otpVerificationPost, user_otpVerificationResentOtpGet} from '../../../controller/user/otp/otp-verification.mjs'


const route = express.Router()

route.get('/otp-verification', user_otpVerificationGet)
route.post('/otp-verification', user_otpVerificationPost)
route.get('/otp-verification/resend-otp', user_otpVerificationResentOtpGet)

export default route

