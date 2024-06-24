import { findUserUsingId } from "../../../data/users/find.mjs";
import { updateUserPasswordUsingId } from "../../../data/users/update.mjs"
import { compareHashPassword, hashPassword } from "../../../utils/password-hashing.mjs";

export const user_setNewPasswordGet = async (req, res) => {

    const userId = req.query.id
    console.log(userId, 'i got the userid using query');
    const error = req.session.setNewPasswordError
    res.render('set-new-password', { userId, error })
}

export const user_setNewPasswordPost = async (req, res) => {
    const userId = req.session.USER_ID
    const user = await findUserUsingId(userId)
    console.log(user, 'user is showing');
    console.log(req.body, 'req.body is showing');
    console.log(req.query, 'hehe');


    if (req.query.oldPassword) {
        const oldPassword = await compareHashPassword(req.query.oldPassword, user.password)
        return res.json({ result: 'success', oldPassword })
    } else if (req.query.comparingPass) {

        console.log(userId, 'i got user id using post method also');
        const comparingOldAndNewPass = await compareHashPassword(req.query.comparingPass, user.password)
        return res.json({ result: "same pass", comparingOldAndNewPass })

    } else if (req.body.password) {
        const newPasswordpassword = req.body.password
        const password = await hashPassword(newPasswordpassword)
        console.log(password);

        await updateUserPasswordUsingId(userId, password)
        res.redirect('/user-profile')
    }
}