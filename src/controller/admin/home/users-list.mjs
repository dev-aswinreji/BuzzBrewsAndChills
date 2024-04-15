import { findAllUser } from "../../../data/admin/find.mjs"
import { updateUserStatus } from "../../../data/admin/update.mjs"


export const admin_userListGet = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error,'ADMIN USER LIST GET');
        
    }
    const userList = await findAllUser()
    console.log(userList)
    res.render('usersList', { userList })
}

export const admin_userListManage = async (req, res) => {
    try {

        const userId = req.params.id
        const userAccountStatus = req.query.id

        if (userAccountStatus === 'ACTIVE') {
            req.session.userAllowed = 'BLOCKED'
            await updateUserStatus(userId, { accountStatus: 'BLOCKED' })
        } else {
            await updateUserStatus(userId, { accountStatus: 'ACTIVE' })
        }

        res.redirect('/admin/users-list')
    } catch (error) {
        console.log(error, 'ADMIN USER LIST POST');
    }

}