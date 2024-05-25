import { wishlistCollection } from "../../model/wishlist.mjs";

export async function insertProductToWishlist(userId, product) {
  await wishlistCollection.updateOne(
    { userId: userId },
    {
      $addToSet: {
        products: {
          productId: product,
        },
      },
    },
    { upsert: true }
  );
}
