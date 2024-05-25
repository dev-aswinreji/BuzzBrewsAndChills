import { findSingleProduct } from "../../../data/products/find.mjs"
import { deleteProductFromWishlist } from "../../../data/wishlist/delete.mjs"
import { findWishlistProductForUser } from "../../../data/wishlist/find.mjs"
import { insertProductToWishlist } from "../../../data/wishlist/insert.mjs"


export const user_wishlistGet = async (req,res)=> {
    const userId = req.session.USER_ID
    const wishlist = await findWishlistProductForUser(userId)
    console.log(wishlist,'wishlist is showing');
    res.render('wishlist',{wishlist})
}


export const user_addToWishlistGet = async (req,res) => {
    const userId = req.session.USER_ID
    const productId = req.query.productId
    const products = await findSingleProduct(productId)
    await insertProductToWishlist(userId,products)
    res.json({result:'success'})
}

export const user_deleteProductFromWishlist = async (req,res) => {
    const userId = req.session.USER_ID
    const productId = req.query.productId
    await deleteProductFromWishlist(userId,productId)
    res.json({result:'success'})
}