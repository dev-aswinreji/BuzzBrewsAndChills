
import passport from 'passport'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import { insertGoogle, insertUser } from './data/users/insert.mjs'
import { findUser } from './data/users/find.mjs'


passport.serializeUser((user, cb) => {
    cb(null, user)
})

passport.deserializeUser((obj, cb) => {
    cb(null, obj)
})

/* Google Authentication */

console.log('google signin page working ')
export const googleSignIn = passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
    try {
        await accessToken, refreshToken
        const googleData = await profile

        console.log(googleData._json.email);

        console.log('inside try block');

        const user = await findUser(googleData._json.email)
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

            const newUser = await insertUser(userData)
            console.log(newUser, 'new user is showing');

            done(null, newUser)
        }
    } catch (error) {
        console.log(error, 'googleSignin Passport Error');
        done(null, error);
    }
}
))

