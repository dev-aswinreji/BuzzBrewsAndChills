import express from 'express'
import session from 'express-session'
import nocache from 'nocache'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'
import { userCollection } from './model/userdata.mjs'
import route from './route/userRoute.mjs'



const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

app.use(express.urlencoded({ extended: true }))


app.use(express.static('public'))

app.use(nocache())

app.set('views', [
    path.join(__dirname, 'views/admin'),
    path.join(__dirname, 'views/admin_signin'),
    path.join(__dirname, 'views/user'),
    path.join(__dirname, 'views/user_sign')
])

app.set('view engine', 'ejs')

app.use(session({
    secret: 'sercret key',
    saveUninitialized: false,
    resave: false
}))

app.use('/',route)


app.listen(3000, () => {
    console.log('server is running')
})

  