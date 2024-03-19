import { googleSignIn } from "../../../google.mjs"



export const user_googleVerification = googleSignIn.authenticate('google',
    { scope: ['profile', 'email'] }

)



export const user_googleVerificationCallback = googleSignIn.authenticate('google',
    { failureRedirect: '/error' }

)




export const user_signinWithGoogleSuccess = async (req, res) => {
    console.log('working or not signin with google ')

    res.redirect('/home')
}
export const user_signinWithGoogleFailed = async (req, res) => {
    res.send('error logging in')
}
