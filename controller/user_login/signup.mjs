
import { userData } from "../../mongodbMethods/users/find/find.mjs"
import { insertUser } from "../../mongodbMethods/users/insert/insert.mjs"


export const user_signupGet = async (req, res) => {
    res.render('signup')
}

async function isNull(data) {
    const emailExist = await userData(data.email)
    if (emailExist === null) {
        return false
    }
    if (data.email === emailExist.email) {

        return true

    }

}

export const user_signupPost = async (req, res) => {

    try {

        const data = {
            full_name: req.body.fullname,
            last_name: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
        }

        if (await isNull(data) === true) {
            res.redirect('/signup')
        } else {

            await insertUser(data)
            console.log(await userData(data.email))
            res.render('signin')

        }

    } catch (error) {
        console.log(error)
    }



}

