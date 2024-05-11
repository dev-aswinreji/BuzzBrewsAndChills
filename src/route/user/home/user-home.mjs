import express from 'express'

const routeHome = express.Router()

import {user_homeGet} from "../../../controller/user/home/home.mjs";
import {user_checkoutGet} from '../../../controller/user/home/checkout.mjs';
import {user_aboutGet} from '../../../controller/user/home/about.mjs';
import {user_shopGet} from '../../../controller/user/home/shop.mjs';
import {user_contactGet} from '../../../controller/user/home/contact.mjs';
import {user_productView} from '../../../controller/user/home/product-view.mjs';
import {user_profileGet} from '../../../controller/user/home/user-profile.mjs';
import {user_authentication} from '../../../middleware/user-auth.mjs';
import {user_setNewPasswordGet, user_setNewPasswordPost} from '../../../controller/user/home/set-new-password.mjs';
import {user_editAddressGet, user_editAddressPost} from '../../../controller/user/home/edit-address.mjs';
import {user_updateProfileGet, user_updateProfilePost} from '../../../controller/user/home/update-profile.mjs';
import {user_cartGet} from '../../../controller/user/home/cart.mjs';
import {user_addToCartGet} from '../../../controller/user/home/add-to-cart.mjs';
import {user_addToCartManageGet} from '../../../controller/user/home/add-to-cart-manage.mjs';
import {user_addressGet} from '../../../controller/user/home/address.mjs';
import {user_addAddressGet, user_addAddressPost} from '../../../controller/user/home/add-address.mjs';
import {user_addressDeleteDelete} from '../../../controller/user/home/delete-address.mjs';
import { user_paymentGet } from '../../../controller/user/home/payment.mjs';
import { user_orderAddGet, user_orderListGet } from '../../../controller/user/home/order.mjs';
import { user_updateDefaultAddressGet } from '../../../controller/user/home/update-default-address.mjs';
import { user_cancelOrderGet } from '../../../controller/user/home/cancel-order.mjs';
import { user_deleteCartProductDelete } from '../../../controller/user/home/delete-cart.mjs';
import { user_razorpay } from '../../../controller/user/home/razorpay.mjs';

routeHome.get('/', user_homeGet)
routeHome.get('/home', user_homeGet)

routeHome.get('/about', user_aboutGet)

routeHome.get('/contact', user_contactGet)

routeHome.get('/shop', user_shopGet)

routeHome.get('/contact', user_contactGet)

routeHome.get('/edit-address', user_authentication, user_editAddressGet)
routeHome.post('/edit-address', user_authentication, user_editAddressPost)

routeHome.get('/user-profile', user_authentication, user_profileGet)

routeHome.get('/update-profile', user_authentication, user_updateProfileGet)
routeHome.post('/update-profile', user_authentication, user_updateProfilePost)

routeHome.get('/address', user_authentication, user_addressGet)

routeHome.get('/add-address', user_authentication, user_addAddressGet)
routeHome.post('/add-address', user_authentication, user_addAddressPost)

routeHome.delete('/delete-address', user_addressDeleteDelete)

routeHome.get('/update-default-address', user_updateDefaultAddressGet)

routeHome.get('/checkout', user_checkoutGet)
routeHome.post('/address', user_addAddressPost)

routeHome.get('/cart', user_authentication, user_cartGet)
routeHome.get('/add-to-cart', user_authentication, user_addToCartGet)
routeHome.get('/add-to-cart-manage', user_authentication, user_addToCartManageGet)
routeHome.delete('/delete-cart-product',user_deleteCartProductDelete)


routeHome.get('/set-new-password', user_authentication, user_setNewPasswordGet)
routeHome.post('/set-new-password', user_authentication, user_setNewPasswordPost)

routeHome.get('/product-view/:id', user_productView)

routeHome.get('/payment',user_paymentGet)
routeHome.post('/razorpay-payment',user_razorpay)

routeHome.get('/order-add',user_orderAddGet)

routeHome.get('/cancel-order',user_cancelOrderGet)

routeHome.get('/order',user_orderListGet)

export default routeHome
