import { orderCollection } from "../../model/order.mjs";

export async function findOrderData(userId) {
  try {
    return await orderCollection
      .find({ userId: userId })
      .sort({ _id: -1 });
  } catch (error) {
    console.log(error, "error occured in find order data func");
  }
}

export async function findAllOrderDataForAdmin(skip, limit) {
  try {
    return await orderCollection
      .find()
      .sort({ timeStamp: -1 })
      .skip(skip)
      .limit(limit).populate('userId')
  } catch (error) {
    console.log(error, "error occured in find all order data for admin func");
  }
}

export async function findUniqueOrderToChangeOrderStatus(orderId) {
  try {
    return await orderCollection.findById(orderId).populate('userId')
  } catch (error) {
    console.log(
      error,
      "error occured in find unique order to change order status func"
    );
  }
}

export async function findTotalCountOfAllOrdersForAdmin() {
  return await orderCollection.countDocuments();
}

export async function findSingleOrder(orderId) {
  return await orderCollection.findOne({ orderId: orderId });
}

export async function findAllOrderSuccessFullOrderAmount() {
  return await orderCollection.find({ "products.status": "DELIVERED" });
}

export async function findAllReturnedOrders(skip,limit) {
  return await orderCollection.find({
    $or: [
      { products: { $elemMatch: { status: "PENDING APPROVAL"} } },
      { products: { $elemMatch: { returnStatus: "APPROVE"} } }
    ]
  }).skip(skip).limit(limit)
}

export async function findAllReturnedOrdersCount() {
  return await orderCollection.countDocuments({
    $or: [
      { products: { $elemMatch: { status: "PENDING APPROVAL" } } },
    ]
  })
}


export async function findUniqueOrderToChangeReturnOrderStatus(orderId){
  try {
    return await orderCollection.findById(orderId)
  } catch (error) {
    console.log(error,'find unique order to change return status func error');
  }
}

export async function returnOrderStatusUpdate(orderId,update,options){
  return await orderCollection.findOneAndUpdate({ orderId: orderId }, update, options);
}