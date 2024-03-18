import { googleSignIn } from "../../../google.mjs"



export const user_googleVerification = googleSignIn.authenticate('google',
    { scope: ['profile', 'email'] }

)



export const user_googleVerificationCallback = googleSignIn.authenticate('google',
    { failureRedirect: '/error' }
    
)
