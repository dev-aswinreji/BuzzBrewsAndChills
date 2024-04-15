
import express from 'express'

const routeHome = express.Router()

import { user_homeGet } from "../../../controller/user/home/home.mjs";
import { user_addressPost, user_checkoutGet } from '../../../controller/user/home/checkout.mjs';
import { user_cartGet } from '../../../controller/user/home/cart.mjs';
import { user_aboutGet } from '../../../controller/user/home/about.mjs';
import { user_shopGet } from '../../../controller/user/home/shop.mjs';
import { user_contactGet } from '../../../controller/user/home/contact.mjs';
import { user_productView } from '../../../controller/user/home/product-view.mjs';

routeHome.get('/', user_homeGet)
routeHome.get('/home', user_homeGet)

routeHome.get('/about', user_aboutGet)

routeHome.get('/contact',user_contactGet)

routeHome.get('/shop',user_shopGet)

routeHome.get('/contact',user_contactGet)

routeHome.get('/checkout', user_checkoutGet)
routeHome.post('/address', user_addressPost)

routeHome.get('/cart', user_cartGet)

routeHome.get('/product-view/:id',user_productView)

export default routeHome