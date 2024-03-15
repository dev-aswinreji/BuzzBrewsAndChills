
import express from 'express'

const route = express.Router()

 route.use((err,req,res,next)=>{
    res.render('404-not-found')
})

export default route