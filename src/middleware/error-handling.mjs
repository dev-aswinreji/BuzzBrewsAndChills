
import express from 'express'

try {

    const routeError = express.Router()

    routeError.use((err, req, res, next) => {
        res.render('404-not-found')
    })
    
} catch (error) {
    console.log(error, 'ERROR HANDLING MIDDLEWARE');
}


export default routeError