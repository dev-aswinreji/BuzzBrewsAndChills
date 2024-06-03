
export function formatReportData(reportData) {
    return reportData.map(data => ({
        date: `${data._id.year}-${data._id.month}-${data._id.day}`,
        totalDeliveredOrders: data.totalDeliveredOrders,
        totalDeliveredCost: data.totalDeliveredCost,
    }));
}
