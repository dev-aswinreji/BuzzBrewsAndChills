import express from 'express'

import {user_authentication} from '../../../middleware/user-auth.mjs';

import { user_addToWishlistGet, user_deleteProductFromWishlist, user_wishlistGet } from '../../../controller/user/wishlist/wishlist.mjs';

const wishlistRoute = express.Router()

wishlistRoute.get('/wishlist',user_authentication,user_wishlistGet)
wishlistRoute.get('/add-to-wishlist',user_authentication,user_addToWishlistGet)
wishlistRoute.delete('/remove-wishlist',user_authentication,user_deleteProductFromWishlist)

export default wishlistRoute
