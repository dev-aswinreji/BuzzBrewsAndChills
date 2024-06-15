import express from 'express'

import {user_authentication} from '../../../middleware/user-auth.mjs';


const routeHome = express.Router()




import { user_addToWishlistGet, user_deleteProductFromWishlist, user_wishlistGet } from '../../../controller/user/wishlist/wishlist.mjs';


routeHome.get('/wishlist',user_authentication,user_wishlistGet)
routeHome.get('/add-to-wishlist',user_authentication,user_addToWishlistGet)
routeHome.delete('/remove-wishlist',user_authentication,user_deleteProductFromWishlist)


export default routeHome
