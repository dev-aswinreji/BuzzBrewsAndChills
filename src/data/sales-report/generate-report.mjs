import moment from "moment";
import { orderCollection } from "../../model/order.mjs";


export async function generateReport(period) {
    const now = new Date();
    let matchStage = {};

    switch (period) {
        case 'daily':
            matchStage.orderDate = { $gte: moment(now).startOf('day').toDate() };
            break;
        case 'weekly':
            matchStage.orderDate = { $gte: moment(now).subtract(7, 'days').startOf('day').toDate() };
            break;
        case 'monthly':
            matchStage.orderDate = { $gte: moment(now).startOf('month').toDate() };
            break;
        default:
            throw new Error("Invalid period specified");
    }

    console.log("Match Stage:", JSON.stringify(matchStage, null, 2));

    const initialData = await orderCollection.find(matchStage).exec();
    try {
        console.log("Initial Data Matching the Period:", initialData);
    } catch (error) {
        console.error("Error fetching initial data:", error);
    }


    const groupStage = {
        _id: {
            year: { $year: "$orderDate" },
            month: { $month: "$orderDate" },
            day: { $dayOfMonth: "$orderDate" },
        },
        totalDeliveredOrders: { $sum: 1 },
        totalDeliveredCost: { $sum: "$totalPrice" },
    };

    console.log("Group Stage:", JSON.stringify(groupStage, null, 2));

    const pipeline = [
        { $match: matchStage },
        { $group: groupStage },
        { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }
    ];

    console.log("Pipeline:", JSON.stringify(pipeline, null, 2));


    const report = await orderCollection.aggregate(pipeline).exec();
    console.log("Generated Report:", report, '================================================================================');
    return report;
}

