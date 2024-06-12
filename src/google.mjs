
import dotenv from 'dotenv'
import passport from 'passport'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import { insertGoogle } from './data/users/insert.mjs'
import { findUser } from './data/users/find.mjs'


passport.serializeUser((user, cb) => {
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
}, async (accessToken, refreshToken, profile, done) => {
    try {
        await accessToken, refreshToken
        const googleData = await profile

        console.log(googleData._json.email);

        console.log('inside try block');

        const user = await findUser(googleData.id)
        console.log(user, 'USER CREATED');

        if (user) {
            console.log(user, 'user exist');
            done(null, user)
        } else {
            console.log('inside else');
            const userData = {

                fullName: googleData.displayName,

                email: googleData._json.email,
            }
            console.log(userData);

            const newUser = await insertGoogle(userData)
            console.log(newUser,'new user is showing');

            done(null, newUser)
        }
    } catch (error) {
        console.log(error, 'googleSignin Passport Error');
        done(null, error);
    }
}
))

