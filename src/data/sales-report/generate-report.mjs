import moment from "moment";
import { orderCollection } from "../../model/order.mjs";

export async function generateReport(period, customStartDate, customEndDate) {
    let matchStage = { "products.status": "DELIVERED" };

    switch (period) {
        case 'daily':
            matchStage.orderDate = { $gte: moment(customStartDate).startOf('day').toDate(), $lte: moment(customEndDate).endOf('day').toDate() };
            break;
        case 'weekly':
            matchStage.orderDate = { $gte: moment(customEndDate).subtract(7, 'days').startOf('day').toDate(), $lte: moment(customEndDate).endOf('day').toDate() };
            break;
        case 'monthly':
            matchStage.orderDate = { $gte: moment(customEndDate).startOf('month').toDate(), $lte: moment(customEndDate).endOf('month').toDate() };
            break;
        case 'yearly':
            matchStage.orderDate = { $gte: moment(customEndDate).startOf('year').toDate(), $lte: moment(customEndDate).endOf('year').toDate() };
            break;
        case 'custom':
            matchStage.orderDate = { $gte: moment(customStartDate).startOf('day').toDate(), $lte: moment(customEndDate).endOf('day').toDate() };
            break;
        default:
            throw new Error("Invalid period specified");
    }

    const pipeline = [
        { $match: matchStage },
        { $unwind: "$products" },
        {
            $lookup: {
                from: "userdatas",
                localField: "userId",
                foreignField: "_id",
                as: "user"
            }
        },
        { $unwind: "$user" },
        {
            $group: {
                _id: {
                    year: { $year: "$orderDate" },
                    month: { $month: "$orderDate" },
                    day: { $dayOfMonth: "$orderDate" },
                    productId: "$products.productId"
                },
                date: { $first: "$orderDate" },
                username: { $first: "$user.fullName" }, // Assuming fullName is the username field in userData collection
                productName: { $first: "$products.name" },
                quantity: { $sum: "$products.quantity" },
                price: { $sum: "$products.price" },
                couponDiscount: { $sum: "$couponDiscount" },
                originalAmount: { $sum: { $multiply: ["$products.quantity", "$products.price"] } },
                totalRevenue: { $sum:"$totalPrice"  }
            }
        },
        {
            $project: {
                _id: 0,
                date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                username: 1,
                productName: 1,
                quantity: 1,
                price: 1,
                couponDiscount: 1,
                originalAmount: 1,
                totalRevenue: 1
            }
        },
        { $sort: { date: 1 } }
    ];

    try {
        const report = await orderCollection.aggregate(pipeline).exec();
        return report;
    } catch (error) {
        console.error("Error generating report:", error);
        return [];
    }
}
