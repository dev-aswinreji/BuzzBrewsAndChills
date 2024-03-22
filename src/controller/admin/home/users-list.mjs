import { findAllUser } from "../../../data/admin/find.mjs"


export const admin_userListGet = async (req, res) => {
    const userList = await findAllUser()
    console.log(userList)
    res.render('usersList',{userList})
}

export const admin_userListBlockQuery = async (req,res)=>{
    console.log(req.query._id)
   
}