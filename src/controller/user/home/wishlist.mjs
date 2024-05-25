import { findSingleProduct } from "../../../data/products/find.mjs"
import { deleteProductFromWishlist } from "../../../data/wishlist/delete.mjs"
import { findDuplicateWishlistProductOfUser, findWishlistProductForUser } from "../../../data/wishlist/find.mjs"
import { insertProductToWishlist } from "../../../data/wishlist/insert.mjs"
import { checkDataDuplication } from "../../../validation/checking-duplicateData.mjs"


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
    console.log(productId);
    console.log(products,'product is showing');
    const data = await findDuplicateWishlistProductOfUser(userId,products._id)
    console.log(data,'duplicate data is showing');
    const result = await checkDataDuplication(data)
    let response;
    if(result === 'NOT EXIST'){
        await insertProductToWishlist(userId,products)
        response = {result:'success'}
    }else{
        response = {result:'product already exist'}
    }
    res.json(response)
}

export const user_deleteProductFromWishlist = async (req,res) => {
    const userId = req.session.USER_ID
    const productId = req.query.productId
    await deleteProductFromWishlist(userId,productId)
    res.json({result:'success'})
}