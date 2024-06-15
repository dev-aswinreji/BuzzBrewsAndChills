import express from 'express'

import {user_signupGet, user_signupPost} from '../../../controller/user/signup/signup.mjs'

const signupRoute = express.Router()

signupRoute.get('/signup', user_signupGet)
signupRoute.post('/signup', user_signupPost)

export default signupRoute

