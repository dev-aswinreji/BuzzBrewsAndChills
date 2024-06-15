import express from 'express'

import {user_forgotPasswordPost} from '../../../controller/user/forgot-password/forgot-password.mjs'

const forgotPassRoute = express.Router()

forgotPassRoute.post('/forgot-password', user_forgotPasswordPost)

export default forgotPassRoute

