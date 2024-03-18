
import  express from 'express'

const routeHome = express.Router()

import { user_homeGet } from "../../../controller/user/home/home.mjs";

routeHome.get('/',user_homeGet)
routeHome.get('/home',user_homeGet)

export default routeHome