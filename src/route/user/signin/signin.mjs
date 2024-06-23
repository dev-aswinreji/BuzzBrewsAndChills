import express from 'express'

import {user_signinGet, user_signinPost} from '../../../controller/user/signin/signin.mjs'

import {user_signoutGet} from '../../../controller/user/signin/signout.mjs'

const signinRoute = express.Router()

signinRoute.get('/signin', user_signinGet)
signinRoute.post('/signin', user_signinPost)

signinRoute.get('/signout', user_signoutGet)

export default signinRoute


