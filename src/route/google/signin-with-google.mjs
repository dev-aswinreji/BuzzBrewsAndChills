

import express from "express";
import { googleSignIn } from "../../google.mjs";


const googleRoute = express.Router()


googleRoute.get('/auth/google', googleSignIn.authenticate('google', { scope: ['email', 'profile'] }))


googleRoute.get('/auth/google/callback', googleSignIn.authenticate('google', { failureRedirect: '/error' }), async (req, res) => {
    // console.log(req.user);
    console.log('anything');
    console.log(req.user,'user is shwoin google is working');
    req.session.USER_ID = req.user[0]._id
    console.log(req.session.USER_ID,'userid is showing  whattttttttttttttttttt')
    // console.log(req.user,'req.user is working or not');
    req.session.isUserAuth = true
    res.redirect('/success')
    // console.log(req.user);
})


googleRoute.get('/success', async (req, res) => {

    res.redirect('/home')
})

googleRoute.get('/error', async (req, res) => {
    res.send('error logging in')
})


export default googleRoute
