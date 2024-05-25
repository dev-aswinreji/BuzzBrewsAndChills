import { wishlistCollection } from "../../model/wishlist.mjs";
import { findWishlistProductForUser } from "./find.mjs";

export async function deleteProductFromWishlist(userId, productRemoveId) {
  const wishlist = await findWishlistProductForUser(userId);
  console.log(wishlist.products.length, "what is the length");
  const result =
    wishlist.products.length === 1
      ? await wishlistCollection.deleteOne({
          userId: userId,
          "products.productId": productRemoveId,
        })
      : await wishlistCollection.updateOne(
          { userId: userId },
          { $pull: { products: { productId: productRemoveId } } }
        );

  console.log(result);
  return result;
}
