import { findDuplicateCartProducts } from "../../../data/cart/find.mjs";
import { addToCartData } from "../../../data/cart/insert.mjs";
import { addToCartDataSameProductUpdate } from "../../../data/cart/update.mjs";
import { findSingleProduct } from "../../../data/products/find.mjs";
import { checkDataDuplication } from "../../../validation/checking-duplicateData.mjs";

export const user_addToCartGet = async (req, res) => {
  try {
    const userId = req.session.USER_ID;
    const productId = req.query.productId;
    const quantityFromQuery = req.query.quantity;

    console.log(quantityFromQuery, "quantity is showing");

    const stockFromQuery = req.query.stock.trim();

    console.log(stockFromQuery, "  what is happening here");

    const product = await findSingleProduct(productId);

    const cart = await findDuplicateCartProducts(userId, product);

    const result = await checkDataDuplication(cart);

    if (result === "NOT EXIST") {
      await addToCartData(userId, product, quantityFromQuery);

      return res.json({ result: "within limit" });

    } else {

      const cartItem = cart.items.filter(
        (item) => item.productId._id.toString() === productId.toString()
      );

      console.log(cartItem, "cart item is  showign");
      
      const cartQuantity = cartItem[0].quantity;

      console.log(cartQuantity, "cart quantity is showing");

      const stock = cartItem[0].productId.stock;
      
      console.log(stock, "stock is showing is showing below ");

      if (cartQuantity < stock) {
        console.log(
          quantityFromQuery,
          "quantity from query is showing ========================"
        );
        const response =
          cartQuantity < 10
            ? await addToCartDataSameProductUpdate(
                userId,
                product,
                quantityFromQuery
              ).then(() => ({ result: "within limit", stock: stock }))
            : { result: "limit exceeded" };
        console.log(response, "response is showing");
        return res.json(response);
      } else {
        return res.json({ result: "limit exceeded" });
      }
    }
  } catch (error) {
    console.log(error, "USER ADD TO CART GET ");
  }
};
