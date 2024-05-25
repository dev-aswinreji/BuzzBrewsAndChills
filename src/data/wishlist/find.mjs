import { wishlistCollection } from "../../model/wishlist.mjs";


export async function findWishlistProductForUser (userId){
    return await wishlistCollection.findOne({userId:userId}).populate('products.productId')
}

export async function findDuplicateWishlistProductOfUser (userId,productId){
    return await wishlistCollection.findOne({userId:userId,"products.productId":productId})
}