import { orderCollection } from "../../model/order.mjs";
import { findOrderData } from "../order/find.mjs";


export async function getTopSellingProducts() {
  const topProducts = await orderCollection.aggregate([
    { $unwind: "$products" },
    { $match: { "products.status": 'DELIVERED' } },
    {
      $group: {
        _id: "$products.productId",
        totalSold: { $sum: "$products.quantity" },
        name: { $first: "$products.name" },
        imageUrl: { $first: "$products.imageUrl" }
      }
    },
    { $sort: { totalSold: -1 } },
    { $limit: 10 }

  ]);

  return topProducts;
}

export async function getTopSellingCategories() {
  return await orderCollection.aggregate([
    { $unwind: "$products" },
    { $match: { "products.status": 'DELIVERED' } },
    {
      $group: {
        _id: "$products.category",
        totalSold: { $sum: "$products.quantity" }
      }
    },
    { $sort: { totalSold: -1 } },
    { $limit: 10 },
    {
      $lookup: {
        from: "orders",  // Assuming the orderCollection is orders
        localField: "_id",
        foreignField: "products.category",
        as: "categoryProducts"
      }
    },
    { $unwind: "$categoryProducts" },
    { $unwind: "$categoryProducts.products" },
    { $match: { "categoryProducts.products.category": { $ne: null } } },
    {
      $group: {
        _id: "$_id",
        totalSold: { $first: "$totalSold" },
        name: { $first: "$_id" },
        imageUrl: { $first: "$categoryProducts.products.imageUrl" }
      }
    }
  ]);
}
