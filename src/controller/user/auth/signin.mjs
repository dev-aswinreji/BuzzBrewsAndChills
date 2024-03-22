import { findUser } from "../../../data/users/find.mjs"
import { compareHashPassword } from "../../../utils/password-hashing.mjs"
import { isUserNull } from "../../../validation/is-null.mjs"


export const user_signinGet = (req, res) => {
    if (req.session.isAuth) {
        res.redirect('/home')
    } else {
        res.render('signin')
    }
}
export const user_signinPost = async (req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.password
    }
    const userAuth = await findUser(data.email)
    const userData = await isUserNull(userAuth)

    if(userData === true){
        return res.redirect('/signin')
    }

    req.session.userEmailForAddUserAddress = userAuth.email


    const pass = await compareHashPassword(data.password, userAuth.password)
    console.log(pass)

    if (data.email === userAuth.email && pass === true) {
        req.session.isAuth = true
        res.render('home')
    } else {
        res.redirect('/signin')
    }

}