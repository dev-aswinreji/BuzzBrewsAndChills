import express, { json } from 'express'
import session from 'express-session'
import nocache from 'nocache'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'
import dotenv from 'dotenv'
import route from './route/user/auth/user-auth.mjs'
import authRoute from './route/admin/auth/admin.mjs'
import adminHomeRoute from './route/admin/home/admin-home.mjs'

import passport from 'passport'
import bodyParser from 'body-parser'
import Jwt from 'jsonwebtoken' //no need in this week
import axios from 'axios'
import redis from 'redis'
import googleRoute from './route/google/signin-with-google.mjs'
import routeHome from './route/user/shop/shop.mjs'
import routeHome from './route/user/razorpay/razorpay.mjs'


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
app.use('/', route)
app.use('/', routeHome)
app.use('/admin', authRoute)
app.use('/admin', adminHomeRoute)
app.use('/', googleRoute)


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



