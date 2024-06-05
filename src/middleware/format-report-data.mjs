export function formatReportData(reportData) {
    return reportData.map(data => ({
        date: data.date,
        username: data.username,
        productName: data.productName,
        quantity: data.quantity,
        price: data.price,
        couponDiscount: data.couponDiscount,
        originalAmount: data.originalAmount,
        totalRevenue: data.totalRevenue,
        totalDiscountPercentage: data.totalDiscountPercentage
    }));
}