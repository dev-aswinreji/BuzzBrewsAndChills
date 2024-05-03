import { deleteCartProduct } from "../../data/cart/delete.mjs";

export const user_deleteCartProductDelete = async (req, res) => {
  const productId = req.query.productId;

  const userId = req.session.USER_ID;

  await deleteCartProduct(userId, productId);

  res.json({ result: "success" });
};
