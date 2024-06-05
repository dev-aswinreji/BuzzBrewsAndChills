import moment from "moment";
import { orderCollection } from "../../model/order.mjs";

export async function generateReport(period) {
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
                price: { $sum: "$products.price" },
                couponDiscount: { $sum: "$products.discount_price" },
                originalAmount: { $sum: "$originalPrice" },
                totalRevenue: { $sum: "$totalPrice" },
                totalDiscountPercentage: { $sum: "$couponDiscount" }
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

    // console.log(pipeline,'pipeline');
    // const agg = await orderCollection.aggregate([{ $match: matchStage },{ $unwind: "$products" }, {
    //     $lookup: {
    //         from: "userdatas", // Ensure this is the correct collection name
    //         localField: "userId",
    //         foreignField: "_id",
    //         as: "users"
    //     }
    // }, { $unwind: "$users" }])
    // console.log("Pipeline:", JSON.stringify(pipeline, null, 2));
    // console.log(agg, 'agg is showing');

    try {
        const report = await orderCollection.aggregate(pipeline).exec();
        console.log("Generated Report:", report);
        return report;
    } catch (error) {
        console.error("Error generating report:", error);
        return null;
    }

}
