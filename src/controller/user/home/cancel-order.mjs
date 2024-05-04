import { updateCancelProduct } from "../../../data/order/update.mjs";
import { findSingleProduct } from "../../../data/products/find.mjs";
import { updateProducts } from "../../../data/products/update.mjs";

export const user_cancelOrderGet = async (req, res) => {
  try {
    const productId = req.query.productId;
    const product = await findSingleProduct(productId);
    const quantity = req.query.quantity;
    const orderId = req.query.orderId;

    let updateProductStock = Number(product.stock) + Number(quantity);

    const result = await updateCancelProduct(orderId);

    const response =
      result === "Success"
        ? await updateProducts(productId, { stock: updateProductStock }).then(
            () => ({ result: "success" })
          )
        : { result: "fail" };

    res.json(response);
  } catch (error) {
    console.log(error, "USER CANCEL ORDER GET ");
  }
};
