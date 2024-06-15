import exprees from "express";
import { admin_signinGet, admin_signinPost } from "../../../controller/admin/signin/signin.mjs";
import { admin_signoutGet } from "../../../controller/admin/signin/signout.mjs";


const authRoute = exprees.Router()


authRoute.get('/',admin_signinGet)
authRoute.get('/signin',admin_signinGet)
authRoute.post('/signin',admin_signinPost)

authRoute.get('/signout',admin_signoutGet)



export default authRoute

