import express from 'express'

import {user_forgotPasswordPost} from '../../../controller/user/forgot-password/forgot-password.mjs'


import express from 'express'
route.post('/forgot-password', user_forgotPasswordPost)
export default route

