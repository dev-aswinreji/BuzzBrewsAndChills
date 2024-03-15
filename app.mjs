import express from 'express'
import session from 'express-session'
import nocache from 'nocache'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'
import dotenv from 'dotenv'
import route from './route/userRoute.mjs'

dotenv.config()

const PORT = process.env.PORT

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

app.use('/',route)


app.use((err, req, res, next) => {
    res.status(500).send('404-not-found')
})

app.listen(PORT, () => {
    console.log(`Server is running `)
})


 