import {findAllUser, findTotalCountOfAllUsersForAdmin} from "../../../data/admin/find.mjs"
import {updateUserStatus} from "../../../data/admin/update.mjs"


export const admin_userListGet = async (req, res) => {
    try {
        const limit = 6; 
        let page = Number(req.query.page) || 1; 
            
        const TOTAL_COUNT_OF_USERS = await findTotalCountOfAllUsersForAdmin();
        const totalPages = Math.ceil(TOTAL_COUNT_OF_USERS / limit);
        console.log(TOTAL_COUNT_OF_USERS,'total count is showing');
        page = Math.max(1, Math.min(page, totalPages));
    
        const skip = (page - 1) * limit;

        const userList = await findAllUser(skip,limit)
        console.log(userList)
        res.render('usersList', {userList, page,totalPages, count: TOTAL_COUNT_OF_USERS})

    } catch (error) {
        console.log(error, 'ADMIN USER LIST GET');
    }
}

export const admin_userListManage = async (req, res) => {
    try {

        const userId = req.params.id
        const userAccountStatus = req.query.accountStatus
        
        if (userAccountStatus === 'ACTIVE') {
            req.session.userAllowed = 'BLOCKED'
            await updateUserStatus(userId, {accountStatus: 'BLOCKED'})
        } else {
            await updateUserStatus(userId, {accountStatus: 'ACTIVE'})
        }

        res.json({id:userId})

        // res.redirect('/admin/users-list')
    } catch (error) {
        console.log(error, 'ADMIN USER LIST POST');
    }

}
