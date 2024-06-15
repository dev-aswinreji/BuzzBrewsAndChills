import express from 'express'

import { user_homeGet } from '../../../controller/user/shop/home.mjs';
import { user_shopGet } from '../../../controller/user/shop/shop.mjs';
import { user_productView } from '../../../controller/user/shop/product-view.mjs';

const routeHome = express.Router()

routeHome.get('/', user_homeGet)
routeHome.get('/home', user_homeGet)

routeHome.get('/shop', user_shopGet)
routeHome.get('/product-view/:id', user_productView)

export default routeHome

