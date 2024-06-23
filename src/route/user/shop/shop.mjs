import express from 'express'

import { user_homeGet } from '../../../controller/user/shop/home.mjs';
import { user_shopGet } from '../../../controller/user/shop/shop.mjs';
import { user_productView } from '../../../controller/user/shop/product-view.mjs';

const shopRoute = express.Router()

shopRoute.get('/', user_homeGet)
shopRoute.get('/home', user_homeGet)

shopRoute.get('/shop', user_shopGet)
shopRoute.get('/product-view/:id', user_productView)

export default shopRoute

