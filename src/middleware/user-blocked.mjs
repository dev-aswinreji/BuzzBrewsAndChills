
import express from 'express'

const blockOrUnblock = express.Router()

blockOrUnblock.use((req, res, next) => {
    console.log(req.session.userAllowed, 'working userallowed');
    if (req.session.userAllowed === undefined) {
        next()
    } else if (req.session.userAllowed.status === 'BLOCKED' && req.session.USER_ID === req.session.userAllowed.userId) {
        console.log('inside if ');
        req.session.isUserAuth = false
        // res.redirect('/signin')
        next()
    }
})



export default blockOrUnblock