import express from "express";
import {admin_authentication} from "../../../middleware/admin-auth.mjs";

import {admin_userListGet, admin_userListManage} from "../../../controller/admin/users-list/users-list.mjs";

const adminHomeRoute = express.Router()


adminHomeRoute.get('/users-list', admin_authentication, admin_userListGet)
adminHomeRoute.get('/user-manage/:id', admin_authentication, admin_userListManage)

