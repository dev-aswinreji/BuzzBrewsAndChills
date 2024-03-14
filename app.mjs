import express from 'express'
import session from 'express-session'
import nocache from 'nocache'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'
import passport from 'passport'
// import GoogleStrategyq from ('passport-google-oauth').OAuth2Strategy

// import { userCollection } from './model/userdata.mjs'
// import route from './route/userRoute.mjs'



const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

app.use(express.urlencoded({ extended: true }))


app.use(express.static('public'))

app.use(nocache())

app.set('views', [
    path.join(__dirname, 'views/admin_pages'),
    path.join(__dirname, 'views/admin_signin'),
    path.join(__dirname, 'views/user_pages'), 
    path.join(__dirname, 'views/user_sign')
])

app.set('view engine', 'ejs')

app.use(session({
    secret: 'sercret key',
    saveUninitialized: true,
    resave: false
}))

// app.use('/',route)

app.get('/categories',(req,res)=>{
    res.render('categories')
})
app.get('/orders',(req,res)=>{
    res.render('userOrders')
})
app.get('/details',(req,res)=>{
    res.render('userDetails')
})
app.get('/products',(req,res)=>{
    res.render('list')
})
app.get('/users',(req,res)=>{
    res.render('users')
})
app.get('/dashboard',(req,res)=>{
    res.render('dashboard')
})
app.get('/transaction',(req,res)=>{
    res.render('transaction')
})
app.get('/newproducts',(req,res)=>{
    res.render('addNewProducts')
})

app.get('/adminsignin',(req,res)=>{
    res.render('adminsignin')
})
app.get('/signin',(req,res)=>{
    res.render('signin')
})

passport.serializeUser((user,cb)=>{
    cb(null,user)
})
passport.deserializeUser((obj,cb)=>{
    cb(null,obj)
})

/* GOOGLE AUTH */


app.listen(3000, () => {
    console.log('server is running')
})

  