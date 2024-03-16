
import express from 'express'
import { user_signupGet } from '../../../controller/user_login/signup.mjs'

const route = express.Router()

route.get('/signup',user_signupGet)
route.post('/signup',user)