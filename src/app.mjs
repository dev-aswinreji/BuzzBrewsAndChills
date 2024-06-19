import express, { json } from 'express'
import session from 'express-session'
import nocache from 'nocache'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'
import dotenv from 'dotenv'

import passport from 'passport'
import bodyParser from 'body-parser'
import Jwt from 'jsonwebtoken' //no need in this week
import axios from 'axios'
import redis from 'redis'


//router start 

//admin routes
import categoryRoute from './route/admin/category/category.mjs'
import couponAdminRoute from './route/admin/coupon/coupon.mjs'
import dashboardRoute from './route/admin/dashboard/dashboard.mjs'
import orderAdminRoute from './route/admin/order/order.mjs'
import productsRoute from './route/admin/products/products.mjs'
import salesReportRoute from './route/admin/sales-report/sales-report.mjs'
import signinAdminRoute from './route/admin/signin/admin.mjs'
import usersListRoute from './route/admin/users-list/users-list.mjs'

//signin with google route
import googleRoute from './route/google/signin-with-google.mjs'

//user routes
import aboutRoute from './route/user/about/about.mjs'
import cartRoute from './route/user/cart/cart.mjs'
import checkoutRoute from './route/user/checkout/checkout.mjs'
import contactRoute from './route/user/contact/contact.mjs'
import couponRoute from './route/user/coupon/coupon.mjs'
import emailVerifyRoute from './route/user/email-verification/email-verification.mjs'
import forgotPassRoute from './route/user/forgot-password/forgot-password.mjs'
import orderRoute from './route/user/order/order.mjs'
import otpVerifyRoute from './route/user/otp/otp.mjs'
import razorpayRoute from './route/user/razorpay/razorpay.mjs'
import shopRoute from './route/user/shop/shop.mjs'
import signinRoute from './route/user/signin/signin.mjs'
import signupRoute from './route/user/signup/signup.mjs'
import userProfileRoute from './route/user/user-profile/user-profile.mjs'
import walletRoute from './route/user/wallet/wallet.mjs'
import wishlistRoute from './route/user/wishlist/wishlist.mjs'
import { isAuthenticated } from './middleware/isAuthenticated.mjs'

//router end 

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const PORT = process.env.PORT

export const imageDirectory = path.join(__dirname, '../public/product-images')

dotenv.config()
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(nocache())

app.use(express.static('public'))
app.set('views', [
    path.join(__dirname, 'views/admin/category'),
    path.join(__dirname, 'views/admin/coupon'),
    path.join(__dirname, 'views/admin/dashboard'),
    path.join(__dirname, 'views/admin/logo'),
    path.join(__dirname, 'views/admin/order'),
    path.join(__dirname, 'views/admin/products'),
    path.join(__dirname, 'views/admin/review'),
    path.join(__dirname, 'views/admin/sales-report'),
    path.join(__dirname, 'views/admin/signin'),
    path.join(__dirname, 'views/admin/transaction'),
    path.join(__dirname, 'views/admin/users-list'),
    path.join(__dirname, 'views/admin/error-page'),

    path.join(__dirname, 'views/user/about'),
    path.join(__dirname, 'views/user/cart'),
    path.join(__dirname, 'views/user/checkout'),
    path.join(__dirname, 'views/user/contact'),
    path.join(__dirname, 'views/user/email-verification'),
    path.join(__dirname, 'views/user/forgot-password'),
    path.join(__dirname, 'views/user/order'),
    path.join(__dirname, 'views/user/otp-verfication'),
    path.join(__dirname, 'views/user/razorpay'),
    path.join(__dirname, 'views/user/shop'),
    path.join(__dirname, 'views/user/signin'),
    path.join(__dirname, 'views/user/signup'),
    path.join(__dirname, 'views/user/user-profile'),
    path.join(__dirname, 'views/user/wallet'),
    path.join(__dirname, 'views/user/wishlist'),
    path.join(__dirname, 'views/user/error-page'),


])

app.set('view engine', 'ejs')

app.use(session({
    secret: process.env.SECRET_KEY,
    saveUninitialized: true,
    resave: false
}))


app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    res.locals.session = req.session;
    next()
})
app.use('/', [aboutRoute, cartRoute, checkoutRoute, contactRoute, couponRoute, emailVerifyRoute, forgotPassRoute,orderRoute, otpVerifyRoute, razorpayRoute, shopRoute, signinRoute, signupRoute, userProfileRoute, walletRoute, wishlistRoute])
app.use('/admin', [categoryRoute, couponAdminRoute, dashboardRoute, orderAdminRoute, productsRoute, salesReportRoute, signinAdminRoute, usersListRoute])
app.use('/', googleRoute)

app.get('/check-session', isAuthenticated, (req, res) => {
    res.json({ result: 'success' });
});


app.use((err, req, res, next) => {

    if (err) {
        console.error(err, 'error caught')
        res.send(404)
    }
})

app.use((err, req, res, next) => {
    res.render('404-not-found')
    next()
})


app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`)
})



