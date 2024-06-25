import moment from "moment";
import { orderCollection } from "../../model/order.mjs";

export async function generateReport(period, customStartDate, customEndDate) {

    const data = await orderCollection.find({ "products.status": 'DELIVERED' });
    console.log(data, 'data is showing');
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
        { $unwind: "$products" },
        { $match: matchStage },
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
                _id: (() => {
                    switch (period) {
                        case 'daily':
                            return {
                                year: { $year: "$orderDate" },
                                month: { $month: "$orderDate" },
                                day: { $dayOfMonth: "$orderDate" },
                                productId: "$products.productId"
                            };
                        case 'weekly':
                            return {
                                year: { $year: "$orderDate" },
                                week: { $isoWeek: "$orderDate" },
                                productId: "$products.productId"
                            };
                        case 'monthly':
                            return {
                                year: { $year: "$orderDate" },
                                month: { $month: "$orderDate" },
                                productId: "$products.productId"
                            };
                        case 'yearly':
                            return {
                                year: { $year: "$orderDate" },
                                productId: "$products.productId"
                            };
                        case 'custom':
                            return {
                                year: { $year: "$orderDate" },
                                month: { $month: "$orderDate" },
                                day: { $dayOfMonth: "$orderDate" },
                                productId: "$products.productId"
                            };
                        default:
                            return {
                                productId: "$products.productId"
                            };
                    }
                })(),
                date: { $first: "$orderDate" },
                username: { $first: "$user.fullName" },
                productName: { $first: "$products.name" },
                quantity: { $sum: "$products.quantity" },
                price: { $sum: "$products.originalProductPrice" },
                couponDiscount: { $sum: "$couponDiscount" },
                originalAmount: { $sum: { $multiply: ["$products.quantity", "$products.originalProductPrice"] } },
                totalPrice: { $sum: { $multiply: ["$products.quantity", "$products.price"] } }
            }
        },
        {
            $group: {
                _id: (() => {
                    switch (period) {
                        case 'daily':
                            return {
                                year: "$_id.year",
                                month: "$_id.month",
                                day: "$_id.day"
                            };
                        case 'weekly':
                            return {
                                year: "$_id.year",
                                week: "$_id.week"
                            };
                        case 'monthly':
                            return {
                                year: "$_id.year",
                                month: "$_id.month"
                            };
                        case 'yearly':
                            return {
                                year: "$_id.year"
                            };
                        case 'custom':
                            return {
                                year: "$_id.year",
                                month: "$_id.month",
                                day: "$_id.day"
                            };
                        default:
                            return null;
                    }
                })(),
                totalRevenue: { $sum: "$totalPrice" },
                products: {
                    $push: {
                        _id: {
                            productId: "$_id.productId"
                        },
                        date: "$date",
                        username: "$username",
                        productName: "$productName",
                        quantity: "$quantity",
                        price: "$price",
                        couponDiscount: "$couponDiscount",
                        originalAmount: "$originalAmount",
                        totalPrice: "$totalPrice"
                    }
                }
            }
        },
        {
            $project: {
                _id: 0,
                period: (() => {
                    switch (period) {
                        case 'daily':
                            return { $concat: [{ $toString: "$_id.year" }, "-", { $toString: "$_id.month" }, "-", { $toString: "$_id.day" }] };
                        case 'weekly':
                            return { $concat: [{ $toString: "$_id.year" }, "-W", { $toString: "$_id.week" }] };
                        case 'monthly':
                            return { $concat: [{ $toString: "$_id.year" }, "-", { $toString: "$_id.month" }] };
                        case 'yearly':
                            return { $toString: "$_id.year" };
                        case 'custom':
                            return { $concat: [{ $toString: "$_id.year" }, "-", { $toString: "$_id.month" }, "-", { $toString: "$_id.day" }] };
                        default:
                            return null;
                    }
                })(),
                totalRevenue: 1,
                products: 1
            }
        },
        { $sort: { period: 1 } }
    ];

    try {
        const report = await orderCollection.aggregate(pipeline).exec();
        return report;
    } catch (error) {
        console.error("Error generating report:", error);
        return [];
    }
}
