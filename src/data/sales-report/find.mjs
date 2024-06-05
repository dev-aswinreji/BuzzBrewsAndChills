import { orderCollection } from "../../model/order.mjs";

export async function getDeliveredProductStatsUsingAggregation() {
  const result = await orderCollection
    .aggregate([
      { $unwind: "$products" },
      { $match: { "products.status": "DELIVERED" } },
      {
        $group: {
          _id: "$_id",
          orderTotalCost: {
            $sum: { $multiply: ["$products.price", "$products.quantity"] },
          },
        },
      },
      {
        $group: {
          _id: null,
          totalDeliveredOrders: { $sum: 1 },
          totalDeliveredCost: { $sum: "$orderTotalCost" },
        },
      },
    ])
    .exec();

  return result.length > 0
    ? result[0]
    : { totalDeliveredOrders: 0, totalDeliveredCost: 0 };
}

export async function getDailySalesReport() {
  const result = await orderCollection
    .aggregate([
      { $unwind: "$products" },
      { $match: { "products.status": "DELIVERED" } },
      {
        $group: {
          _id: {
            year: { $year: "$orderDate" },
            month: {
              $month: "$orderDate"
            },
            day: {
              $dayOfMonth: "$orderDate"
            },
          },
          totalDeliveredOrders: { $sum: 1 },
          totalDeliveredCost: {
            $sum: { $multiply: ["$products.price", "$products.quantity"] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          day: "$_id.day",
          totalDeliveredOrders: 1,
          totalDeliveredCost: 1,
        },
      },
      { $sort: { year: 1, month: 1, day: 1 } }, // Sort by year and month
    ])
    .exec();

  return result;
}


export async function getWeeklySalesReport() {
  const result = await orderCollection
    .aggregate([
      { $unwind: "$products" },
      { $match: { "products.status": "DELIVERED" } },
      {
        $group: {
          _id: {
            year: { $year: "$orderDate" },

            week: {
              $week: "$orderDate"
            },
          },
          totalDeliveredOrders: { $sum: 1 },
          totalDeliveredCost: {
            $sum: { $multiply: ["$products.price", "$products.quantity"] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          week: "$_id.week",
          totalDeliveredOrders: 1,
          totalDeliveredCost: 1,
        },
      },
      { $sort: { year: 1, week: 1 } }, // Sort by year and week
    ])
    .exec();

  return result;
}

export async function getMonthlySalesReport() {
  const result = await orderCollection
    .aggregate([
      { $unwind: "$products" },
      { $match: { "products.status": "DELIVERED" } },
      {
        $group: {
          _id: {
            year: { $year: "$orderDate" },
            month: {
              $month: "$orderDate"
            },
          },
          totalDeliveredOrders: { $sum: 1 },
          totalDeliveredCost: {
            $sum: { $multiply: ["$products.price", "$products.quantity"] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          totalDeliveredOrders: 1,
          totalDeliveredCost: 1,
        },
      },
      { $sort: { year: 1, month: 1 } }, // Sort by year and month
    ])
    .exec();

  return result;
}

export async function getYearlySalesReport() {
  const result = await orderCollection
    .aggregate([
      { $unwind: "$products" },
      { $match: { "products.status": "DELIVERED" } },
      {
        $group: {
          _id: {
            year: { $year: "$orderDate" },
          },
          totalDeliveredOrders: { $sum: 1 },
          totalDeliveredCost: {
            $sum: { $multiply: ["$products.price", "$products.quantity"] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          totalDeliveredOrders: 1,
          totalDeliveredCost: 1,
        },
      },
      { $sort: { year: 1 } }, // Sort by year and month
    ])
    .exec();

  return result;
}
