import express from 'express'

import {user_emailVerificationGet, user_emailVerificationPost} from '../../../controller/user/email-verification/email-verification.mjs'

const route = express.Router()
route.get('/email-verification', user_emailVerificationGet)
route.post('/email-verification', user_emailVerificationPost)

export default route

