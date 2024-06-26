
import { findAllOrderSuccessFullOrderAmount } from "../../../data/order/find.mjs"
import { findCountOfCategoryForAdmin, findTotalCountOfAllProductsForAdmin } from "../../../data/products/find.mjs";
import { getMonthlySalesReport, getDeliveredProductStatsUsingAggregation, getYearlySalesReport, getWeeklySalesReport, getDailySalesReport } from "../../../data/sales-report/find.mjs";
import { getTopSellingCategories, getTopSellingProducts } from "../../../data/top-10/top-10.mjs";
import { findAllUserListForAdmin } from "../../../data/users/find.mjs";

export const admin_dashboardGet = async (req, res) => {

    try {

        const totalUserCount = await findAllUserListForAdmin()
        const result = await getDeliveredProductStatsUsingAggregation()
        const { totalDeliveredOrders, totalDeliveredCost } = result
        console.log(result, 'result is shwoing');
        const productCount = await findTotalCountOfAllProductsForAdmin()
        const categoryCount = await findCountOfCategoryForAdmin()

        const monthlyData = await getMonthlySalesReport()
        console.log(monthlyData, 'monthly report');

        const yearlyData = await getYearlySalesReport()
        console.log(yearlyData, 'yearl data is showing');

        const weeklyData = await getWeeklySalesReport()
        console.log(weeklyData, 'weekly report is showing');

        const dailyData = await getDailySalesReport()
        console.log(dailyData, 'dailt report is showing');

        const topProducts = await getTopSellingProducts()
        console.log(topProducts, 'top  products ');
        const topCategories = await getTopSellingCategories()
        console.log(topCategories, 'top 10 categories is showing');
        res.render('dashboard', { orderCount: totalDeliveredOrders, totalRevenue: totalDeliveredCost, totalUserCount, productCount, categoryCount, yearlyData, monthlyData, weeklyData, dailyData, topProducts, topCategories })
    } catch (error) {
        console.log(error, 'ADMIN SALES REPORT PAGE GET')
    }
}



