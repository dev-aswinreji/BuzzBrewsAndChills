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

export async function updateCancelProduct(orderId, productId) {
  try {
    return (await orderCollection.updateOne(
      { orderId: orderId },
      { $set: { "products.$[elem].status": 'CANCELLED' } },
      { arrayFilters: [{ "elem.productId": productId }] }
    ))
      ? "Success"
      : "Fail";
  } catch (error) {
    console.log(error, "update cancel product func error");
  }
}

export async function updateReturnedProductStatus(userId, orderId, returnReason) {
  try {
    const result = await orderCollection.updateOne(
      { userId: userId, orderId: orderId },
      {
        $set: {
          "products.$[].status": "PENDING APPROVAL",
          returnReason: returnReason
        }
      }
    );
    console.log(result,'resutl is showing')
    return result

  } catch (error) {
    console.log(error, 'update return status and reason product func error');
  }
}

export async function updateReturnedProduct(orderId, productId) {
  try {
    return (await orderCollection.updateOne(
      { orderId: orderId },
      { $set: { "products.$[elem].status": 'RETURNED' } },
      { arrayFilters: [{ "elem.productId": productId }] }
    ))
      ? "Success"
      : "Fail";
  } catch (error) {
    console.log(error, "update return product func error");
  }
}

export async function updateOrderedProduct(orderId, productId, status) {
  try {
    console.log(status, "status is showing");
    console.log(productId, 'product id is showing');
    const orderData = await orderCollection.findOne({
      orderId: orderId,
    });
    console.log(orderData, "order data is showing");
    const result = await orderCollection.updateOne(
      { orderId: orderId },
      { $set: { "products.$[elem].status": status } },
      { arrayFilters: [{ "elem.productId": productId }] }
    );
    console.log(result, "update ordered data is success");
    const afterUpdate = await orderCollection.findOne({ orderId: orderId })
    console.log(afterUpdate, 'after update is shwoing');
  } catch (error) {
    console.log(error, "update ordered product func");
  }
}


export async function paymentFailedOrderUpdating(userId, orderId) {
  try {
    const result = await orderCollection.updateOne(
      { userId: userId, orderId: orderId },
      {
        $set: {
          "products.$[].status": "ORDER PLACED",
          paymentStatus: "SUCCESS"
        }
      }
    );
    console.log(result);
    const order = await orderCollection.find({ userId: userId, orderId: orderId })
    console.log(order, 'order is showing');
    await updateProductStockInOrder(order);
    return order
  } catch (error) {
    console.error('Error updating order:', error);
  }
}