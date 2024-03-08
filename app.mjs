import express from 'express'
import session from 'express-session'
import nocache from 'nocache'

const app = express()

app.use(express.urlencoded({extended:true}))


app.use(express.static('public'))

app.use(nocache())

app.set('view engine','ejs')

app.use(session({
    secret:'sercret key',
    saveUninitialized:false,
    resave:false
}))


app.get('/',(req,res)=>{
    res.render('user/index')
})


app.listen(3000,()=>{
    console.log('server is running')
}) 

