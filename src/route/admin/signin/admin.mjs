import exprees from "express";

import { admin_signinGet, admin_signinPost } from "../../../controller/admin/signin/signin.mjs";
import { admin_signoutGet } from "../../../controller/admin/signin/signout.mjs";

const signinRoute = exprees.Router()

signinRoute.get('/',admin_signinGet)
signinRoute.get('/signin',admin_signinGet)
signinRoute.post('/signin',admin_signinPost)

signinRoute.get('/signout',admin_signoutGet)

export default signinRoute

