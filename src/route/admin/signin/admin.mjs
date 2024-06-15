import exprees from "express";

import { admin_signinGet, admin_signinPost } from "../../../controller/admin/signin/signin.mjs";
import { admin_signoutGet } from "../../../controller/admin/signin/signout.mjs";

const signinAdminRoute = exprees.Router()

signinAdminRoute.get('/',admin_signinGet)
signinAdminRoute.get('/signin',admin_signinGet)
signinAdminRoute.post('/signin',admin_signinPost)

signinAdminRoute.get('/signout',admin_signoutGet)

export default signinAdminRoute

