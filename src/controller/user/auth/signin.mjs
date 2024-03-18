import { userData } from "../../../data/users/find.mjs"
import { compareHashPassword } from "../../../utils/passwordHashing.mjs"


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
    const userAuth = await userData(data.email)
    const pass = await compareHashPassword(data.password,userAuth.password)
    console.log(pass)
    if(data.email === userAuth.email && pass === true){
        req.session.isAuth = true
        res.render('home')
    }else{
        res.redirect('/signin')
    }

}