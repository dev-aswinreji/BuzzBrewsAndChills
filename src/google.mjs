
import  dotenv  from 'dotenv'
import passport from 'passport'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'



passport.serializeUser((user, cb) => {
    cb(null, user)
})

passport.deserializeUser((obj, cb) => {
    cb(null, obj)
})

/* Google Authentication */

dotenv.config()

// const GOOGLE_CLIENT_ID = process.env.CLIENT_ID
// const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET

export const googleSignIn = passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.LOCALHOST_URL
}, (accessToken, refreshToken, profile, done) => {
    let userProfile = profile;
    return done(null, userProfile)
}
))
