
import express, { Router } from 'express'
import { user_signupGet, user_signupPost } from '../controller/user_login/signup.mjs'

user_signupGet,user_signupPost

const route = express.Router()

route.get('/signup',user_signupGet)
route.post('/signup',user_signupPost)

export default route