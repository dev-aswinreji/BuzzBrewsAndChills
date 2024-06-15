import express from 'express'

import {user_signupGet, user_signupPost} from '../../../controller/user/signup/signup.mjs'



const route = express.Router()
route.get('/signup', user_signupGet)
route.post('/signup', user_signupPost)

export default route

