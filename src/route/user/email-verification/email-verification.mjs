import express from 'express'

import {user_emailVerificationGet, user_emailVerificationPost} from '../../../controller/user/email-verification/email-verification.mjs'

const emailVerifyRoute = express.Router()

emailVerifyRoute.get('/email-verification', user_emailVerificationGet)
emailVerifyRoute.post('/email-verification', user_emailVerificationPost)

export default emailVerifyRoute

