
import  express from 'express'

const routeHome = express.Router()

import { user_homeGet } from "../../../controller/user/home/home.mjs";
import { user_addressPost, user_checkoutGet } from '../../../controller/user/home/checkout.mjs';
import { user_cartGet } from '../../../controller/user/home/cart.mjs';

routeHome.get('/',user_homeGet)
routeHome.get('/home',user_homeGet)

 

routeHome.get('/checkout',user_checkoutGet)
routeHome.post('/address',user_addressPost)

routeHome.get('/cart',user_cartGet)

export default routeHome