import { updateUserPassword } from "../../../data/users/update.mjs"
import { hashPassword } from "../../../utils/password-hashing.mjs"


export const user_forgotPasswordPost = async (req, res) => {
    try {

        const newPassword = req.body.password

        const hashedNewPassword = await hashPassword(newPassword)

        const userEmail = req.session.userEmailForChangePassword

        const data = await updateUserPassword(userEmail, hashedNewPassword)
        console.log(data)

        res.redirect('/signin')

    } catch (error) {
        console.log(error, 'USER FORGOT PASSWORD POST');
    }

}