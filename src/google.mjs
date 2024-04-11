
import  dotenv  from 'dotenv'
import passport from 'passport'
import { OAuth2Strategy as GoogleStrategy} from 'passport-google-oauth'


passport.serializeUser((user, cb) => {
    console.log(user,'inside serializeUser');
    cb(null, user)
})

passport.deserializeUser((obj, cb) => {
    cb(null, obj)
})

/* Google Authentication */

dotenv.config()
const GOOGLE_CLIENT_ID = process.env.CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET
console.log('google signin page working ')
export const googleSignIn = passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.LOCALHOST_URL
}, (accessToken, refreshToken, profile, done) => {
    let user = profile;
    // console.log(userProfile);
    return done(null, user)
}
))

