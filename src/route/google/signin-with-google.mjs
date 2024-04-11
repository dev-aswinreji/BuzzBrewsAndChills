

import express from "express";
import { googleSignIn } from "../../google.mjs";


const googleRoute = express.Router()


googleRoute.get('/auth/google', googleSignIn.authenticate('google', { scope: ['profile', 'email'] }))


googleRoute.get('/auth/google/callback', googleSignIn.authenticate('google', { failureRedirect: '/error' }), async (req, res) => {
    // console.log(req.user);
    console.log('anything');
    console.log(req.user,'req.user is working or not');

    req.session.isUserAuth = true
    res.redirect('/home')
    // console.log(req.user);
})


// googleRoute.get('/success', async (req, res) => {
//     console.log('working or not signin with google')
//     req.session.isUserAuth = true
//     res.redirect('/home')
// })

googleRoute.get('/error', async (req, res) => {
    res.send('error logging in')
})


export default googleRoute
