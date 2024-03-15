
import express from 'express'
import { user_signupGet, user_signupPost } from '../controller/user_login/signup.mjs'
import { user_signinGet, user_signinPost } from '../controller/user_login/signin.mjs'
import { user_otpVerificationPost } from '../controller/user_login/otpVerification.mjs'
import { user_homeGet } from '../controller/user_home/home.mjs'
import { user_aboutGet } from '../controller/user_home/about.mjs'
import { user_contactGet } from '../controller/user_home/contact.mjs'
import { user_shopGet } from '../controller/user_home/shop.mjs'
import { user_cartGet } from '../controller/user_home/cart.mjs'
import { user_checkoutGet } from '../controller/user_home/checkout.mjs'
import { user_googleVerification, user_googleVerificationCallback } from '../controller/user_login/googleVefication.mjs'


const route = express.Router()

//User signin signup otpverification
route.get('/signup', user_signupGet)
route.post('/signup', user_signupPost)
route.get('/signin', user_signinGet)
route.post('/signin', user_signinPost)
route.post('/otp_verification', user_otpVerificationPost)
route.get('/auth/google', user_googleVerification)
route.get('/auth/google/callback', user_googleVerificationCallback,(req, res) => {res.redirect('/home')})

// end of user sign up sign in otp verification


//User home and checkout pages
route.get('/', user_homeGet)
route.get('/home', user_homeGet)
route.get('/about', user_aboutGet)
route.get('/contact', user_contactGet)
route.get('/shop', user_shopGet)
route.get('/cart', user_cartGet)
route.get('/checkout', user_checkoutGet)


export default route