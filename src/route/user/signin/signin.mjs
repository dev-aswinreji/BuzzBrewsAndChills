import express from 'express'


import {user_signinGet, user_signinPost} from '../../../controller/user/signin/signin.mjs'
import {user_signoutGet} from '../../../controller/user/signin/signout.mjs'


const route = express.Router()


route.get('/signin', user_signinGet)
route.post('/signin', user_signinPost)

route.get('/signout', user_signoutGet)


export default route


