import { findAllUser } from "../../../data/admin/find.mjs"


export const admin_userListGet = async (req, res) => {
    const userList = await findAllUser()
    console.log(userList)
    res.render('usersList',{userList})
}

