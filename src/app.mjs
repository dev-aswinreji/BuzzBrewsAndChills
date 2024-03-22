import express from 'express'
import session from 'express-session'
import nocache from 'nocache'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'
import routeHome from './route/user/home/user-home.mjs'
import route from './route/user/auth/user-auth.mjs'
import authRoute from './route/admin/auth/admin.mjs'
import adminHomeRoute from './route/admin/home/admin-home.mjs'
import passport from 'passport'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const PORT = process.env.PORT

export const imageDirectory = path.join(__dirname,'../public/product-images')

dotenv.config()

const app = express()

app.use(express.urlencoded({ extended: true }))


app.use(express.static('public'))

app.use(nocache())

app.set('views', [
    path.join(__dirname, 'views/admin-pages'),
    path.join(__dirname, 'views/admin-auth'),
    path.join(__dirname, 'views/user-auth'),
    path.join(__dirname, 'views/user-pages')
])

app.set('view engine', 'ejs')

app.use(session({
    secret: 'sercret key',
    saveUninitialized: true,
    resave: false
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/',route)
app.use('/',routeHome)
app.use('/admin',authRoute)
app.use('/admin',adminHomeRoute)


app.use((err, req, res, next) => {
    if(err){
        console.error('error occured file not found')
        return
    }
    res.status(500).send('404-not-found')
})

app.listen(PORT, () => {
    console.log(`Server is running `)
})


 