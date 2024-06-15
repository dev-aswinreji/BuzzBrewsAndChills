import express from 'express'

const routeHome = express.Router()

import {user_checkoutGet} from '../../../controller/user/checkout/checkout.mjs';
import {user_shopGet} from '../../../controller/user/shop/shop.mjs';
import {user_contactGet} from '../../../controller/user/contact/contact.mjs';
import {user_productView} from '../../../controller/user/shop/product-view.mjs';
import {user_profileGet} from '../../../controller/user/user-profile/user-profile.mjs';
import {user_authentication} from '../../../middleware/user-auth.mjs';
import {user_setNewPasswordGet, user_setNewPasswordPost} from '../../../controller/user/user-profile/set-new-password.mjs';
import {user_editAddressGet, user_editAddressPost} from '../../../controller/user/user-profile/edit-address.mjs';
import {user_updateProfileGet, user_updateProfilePost} from '../../../controller/user/user-profile/update-profile.mjs';
import {user_cartGet} from '../../../controller/user/cart/cart.mjs';
import {user_addToCartGet} from '../../../controller/user/cart/add-to-cart.mjs';
import {user_addToCartManageGet} from '../../../controller/user/cart/add-to-cart-manage.mjs';
import {user_addressGet} from '../../../controller/user/user-profile/address.mjs';
import {user_addAddressGet, user_addAddressPost} from '../../../controller/user/user-profile/add-address.mjs';
import {user_addressDeleteDelete} from '../../../controller/user/user-profile/delete-address.mjs';
import { user_orderListGet } from '../../../controller/user/order/order-history.mjs';
import { user_updateDefaultAddressGet } from '../../../controller/user/user-profile/update-default-address.mjs';
import { user_cancelOrderGet } from '../../../controller/user/order/cancel-order.mjs';
import { user_deleteCartProductDelete } from '../../../controller/user/cart/delete-cart.mjs';
import { user_razorpay } from '../../../controller/user/razorpay/razorpay.mjs';
import { user_orderPlacedGet } from '../../../controller/user/order/order-placed.mjs';
import { user_applyCoupon } from '../../../controller/user/coupon/apply-coupon.mjs';
import { user_walletGet } from '../../../controller/user/wallet/wallet.mjs';
import { user_addToWishlistGet, user_deleteProductFromWishlist, user_wishlistGet } from '../../../controller/user/wishlist/wishlist.mjs';
import { user_orderAddGet } from '../../../controller/user/order/add-order.mjs';
import { user_removeCouponGet } from '../../../controller/user/coupon/remove-coupon.mjs';
import { user_returnOrderGet } from '../../../controller/user/order/return-order.mjs';
import { user_walletPaymentGet } from '../../../controller/user/wallet/wallet-payment.mjs';
import { user_orderInvoiceGet } from '../../../controller/user/order/order-invoice.mjs';
import { user_paymentFailedHandler, user_paymentFailedPage } from '../../../controller/user/razorpay/razorpay-payment-failed.mjs';
import { user_orderFailedUpdate } from '../../../controller/user/order/update-failed-order.mjs';
import { user_homeGet } from '../../../controller/user/shop/home.mjs';
import { user_aboutGet } from '../../../controller/user/about/about.mjs';

routeHome.get('/', user_homeGet)
routeHome.get('/home', user_homeGet)

routeHome.get('/about', user_aboutGet)

routeHome.get('/contact', user_contactGet)

routeHome.get('/shop', user_shopGet)

routeHome.get('/contact', user_contactGet)

routeHome.get('/product-view/:id', user_productView)

routeHome.get('/edit-address', user_authentication, user_editAddressGet)
routeHome.post('/edit-address', user_authentication, user_editAddressPost)

routeHome.get('/user-profile', user_authentication, user_profileGet)

routeHome.get('/update-profile', user_authentication, user_updateProfileGet)
routeHome.post('/update-profile', user_authentication, user_updateProfilePost)

routeHome.get('/address', user_authentication, user_addressGet)

routeHome.get('/add-address', user_authentication, user_addAddressGet)
routeHome.post('/add-address', user_authentication, user_addAddressPost)

routeHome.delete('/delete-address',user_authentication, user_addressDeleteDelete)

routeHome.get('/update-default-address',user_authentication, user_updateDefaultAddressGet)

routeHome.get('/checkout',user_authentication, user_checkoutGet)
routeHome.post('/address',user_authentication, user_addAddressPost)

routeHome.get('/cart', user_authentication, user_cartGet)
routeHome.get('/add-to-cart', user_authentication, user_addToCartGet)
routeHome.get('/add-to-cart-manage', user_authentication, user_addToCartManageGet)
routeHome.delete('/delete-cart-product',user_deleteCartProductDelete)


routeHome.get('/set-new-password', user_authentication, user_setNewPasswordGet)
routeHome.post('/set-new-password', user_authentication, user_setNewPasswordPost)


routeHome.post('/razorpay-payment',user_authentication,user_razorpay)
routeHome.post('/payment-failed-handler',user_paymentFailedHandler)
routeHome.get('/payment-failed-page',user_paymentFailedPage)
routeHome.get('/order-add-failed-payment',user_orderFailedUpdate)

routeHome.get('/order-add',user_authentication,user_orderAddGet)
routeHome.get('/order-placed',user_authentication,user_orderPlacedGet)

routeHome.get('/cancel-order',user_authentication,user_cancelOrderGet)
routeHome.get('/return-order',user_authentication,user_returnOrderGet)

routeHome.get('/order-history',user_authentication,user_orderListGet)

routeHome.get('/apply-coupon',user_applyCoupon)
routeHome.delete('/remove-coupon',user_removeCouponGet)

routeHome.get('/wallet',user_authentication,user_walletGet)
routeHome.get('/wallet-payment',user_authentication,user_walletPaymentGet)

routeHome.get('/wishlist',user_authentication,user_wishlistGet)
routeHome.get('/add-to-wishlist',user_authentication,user_addToWishlistGet)
routeHome.delete('/remove-wishlist',user_authentication,user_deleteProductFromWishlist)

routeHome.get('/order-invoice',user_orderInvoiceGet)

export default routeHome
