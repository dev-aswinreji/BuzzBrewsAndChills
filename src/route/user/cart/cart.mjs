import express from 'express'
import {user_authentication} from '../../../middleware/user-auth.mjs';

import {user_cartGet} from '../../../controller/user/cart/cart.mjs';
import {user_addToCartGet} from '../../../controller/user/cart/add-to-cart.mjs';
import {user_addToCartManageGet} from '../../../controller/user/cart/add-to-cart-manage.mjs';
import { user_deleteCartProductDelete } from '../../../controller/user/cart/delete-cart.mjs';


const routeHome = express.Router()

routeHome.get('/cart', user_authentication, user_cartGet)
routeHome.get('/add-to-cart', user_authentication, user_addToCartGet)
routeHome.get('/add-to-cart-manage', user_authentication, user_addToCartManageGet)
routeHome.delete('/delete-cart-product',user_deleteCartProductDelete)


export default routeHome

