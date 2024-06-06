import moment from "moment";
import { orderCollection } from "../../model/order.mjs";

export async function generateReport(period, customStartDate, customEndDate) {
    const now = moment.utc();
    let matchStage = { "products.status": "DELIVERED" };

    switch (period) {
        case 'daily':
            matchStage.orderDate = { $gte: new Date(now.startOf('day').toISOString()) };
            break;
        case 'weekly':
            matchStage.orderDate = { $gte: new Date(now.subtract(7, 'days').startOf('day').toISOString()) };
            break;
        case 'monthly':
            matchStage.orderDate = { $gte: new Date(now.startOf('month').toISOString()) };
            break;
        case 'custom':
            matchStage.orderDate = { $gte: new Date(customStartDate), $lte: new Date(customEndDate) };
            break;
        default:
            throw new Error("Invalid period specified");
    }

    // Log the matchStage to ensure it's correct
    console.log("Match Stage:", JSON.stringify(matchStage, null, 2));

    // Perform a simple find query to check if matchStage returns any data
    const initialData = await orderCollection.find(matchStage).exec();
    if (initialData.length === 0) {
        console.log("No data found for the specified period.");
        return [];
    } else {
        console.log("Initial Data Matching the Period:", initialData);
    }

    const pipeline = [
        { $match: matchStage },
        { $unwind: "$products" },
        {
            $lookup: {
                from: "userdatas", // Ensure this is the correct collection name
                localField: "userId",
                foreignField: "_id",
                as: "user"
            }
        },
        { $unwind: "$user" },
        {
            $group: {
                _id: {
                    year: { $year: { $ifNull: ["$orderDate", new Date(0)] } },
                    month: { $month: { $ifNull: ["$orderDate", new Date(0)] } },
                    day: { $dayOfMonth: { $ifNull: ["$orderDate", new Date(0)] } },
                    productId: "$products.productId"
                },
                date: { $first: "$orderDate" },
                username: { $first: "$user.fullName" },
                productName: { $first: "$products.name" },
                quantity: { $sum: "$products.quantity" },
                price: { $sum: "$products.price" }, // Calculate total price for the quantity of products
                couponDiscount: { $sum: "$products.discount_price" },
                originalAmount: { $sum: { $multiply: ["$products.quantity", "$products.price"] } }, // Calculate original amount for the quantity of products
                totalRevenue: { $sum: { $multiply: ["$products.quantity", { $subtract: ["$products.price", "$products.discount_price"] }] } }, // Calculate total revenue for the quantity of products
                totalDiscountPercentage: { $sum: "$products.discount_percentage" }
            }
        },
        {
            $project: {
                _id: 0,
                date: {
                    $dateToString: {
                        format: "%Y-%m-%d",
                        date: { $ifNull: ["$date", new Date(0)] }
                    }
                },
                username: 1,
                productName: 1,
                quantity: 1,
                price: 1,
                couponDiscount: 1,
                originalAmount: 1,
                totalRevenue: 1,
                totalDiscountPercentage: 1
            }
        },
        { $sort: { date: 1 } }
    ];

    try {
        const report = await orderCollection.aggregate(pipeline).exec();
        console.log("Generated Report:=======================================================================================================================", report);
        return report;
    } catch (error) {
        console.error("Error generating report:", error);
        return null;
    }
}
