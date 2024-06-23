import express from 'express'

import {user_otpVerificationGet, user_otpVerificationPost, user_otpVerificationResentOtpGet} from '../../../controller/user/otp/otp-verification.mjs'

const otpVerifyRoute = express.Router()

otpVerifyRoute.get('/otp-verification', user_otpVerificationGet)
otpVerifyRoute.post('/otp-verification', user_otpVerificationPost)
otpVerifyRoute.get('/otp-verification/resend-otp', user_otpVerificationResentOtpGet)

export default otpVerifyRoute

