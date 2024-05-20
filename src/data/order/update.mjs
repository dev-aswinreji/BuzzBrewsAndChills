import { ObjectId } from "mongodb";
import { orderCollection } from "../../model/order.mjs";
import { findSingleProduct } from "../products/find.mjs";
import { updateProducts } from "../products/update.mjs";

export async function updateProductStockInOrder(order) {
  try {
    for (const products of order[0].products) {
      // console.log(products,'products is shwoing ');
      // console.log(products.productId);
      const product = await findSingleProduct(products.productId);
      // console.log(product,'product data is showing');
      // console.log(product.stock,'product stock',products.quantity,'item and quantity');
      let updatedStock = product.stock - products.quantity;
      // console.log(updatedStock,'updateStock is ');
      const data = await updateProducts(product._id, { stock: updatedStock });
      console.log(
        data,
        "product data is updated in update products stock of order func"
      );
    }
  } catch (error) {
    console.log(error, "update product stock func in order");
  }
}

export async function updateCancelProduct(orderId) {
  try {
    return (await orderCollection.updateOne(
      { orderId: orderId },
      { $set: { productStatus: "CANCELLED" } }
    ))
      ? "Success"
      : "Fail";
  } catch (error) {
    console.log(error, "update cancel product func error");
  }
}

export async function updateOrderedProduct(orderId, _id, status) {
  try {
    console.log(status, "status is showing");
    console.log(_id,'product id is showing');
    const orderData = await orderCollection.findOne({
      orderId: orderId,
    });
    console.log(orderData, "order data is showing");
    const result = await orderCollection.updateOne(
        { orderId: orderId },
        { $set: { "products.$[elem].status": status } },
        { arrayFilters: [{ "elem._id": new ObjectId(_id) }]}
      );
    console.log(result, "update ordered data is success");
    const afterUpdate = await orderCollection.findOne({orderId:orderId})
    console.log(afterUpdate,'after update is shwoing');
  } catch (error) {
    console.log(error, "update ordered product func");
  }
}
