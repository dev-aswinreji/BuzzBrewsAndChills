
import {findAllOrderSuccessFullOrderAmount} from "../../../data/order/find.mjs"
import { findCountOfCategoryForAdmin, findTotalCountOfAllProductsForAdmin } from "../../../data/products/find.mjs";
import { getMonthlySalesReport,getDeliveredProductStatsUsingAggregation, getYearlySalesReport, getWeeklySalesReport, getDailySalesReport } from "../../../data/sales-report/find.mjs";
import { findAllUserListForAdmin } from "../../../data/users/find.mjs";

export const admin_dashboardGet = async (req,res) =>{

    try {
        const order = await findAllOrderSuccessFullOrderAmount()
        console.log(order,'order is showing');
        const orderCount = order.length
        let total = 0 ;
        for (const price of order) {
            total += price.totalPrice
        }
        const totalUserCount = await findAllUserListForAdmin()
        const result = await getDeliveredProductStatsUsingAggregation()
        const {totalDeliveredOrders,totalDeliveredCost} = result
        console.log(result,'result is shwoing');
        const productCount = await findTotalCountOfAllProductsForAdmin()
        const categoryCount = await findCountOfCategoryForAdmin()
        const totalRevenue = total.toFixed(2)
        console.log(total,'total is showing');
        console.log(totalRevenue,'total price is showing heh  ');



       
        
        // order.reduce((acc,curr)=>acc+curr)
        // console.log(order.length);
        // console.log(orderCount,'order count is showing');
        const monthlyData = await getMonthlySalesReport()
        console.log(monthlyData,'monthly report');

        const yearlyData = await getYearlySalesReport()
        console.log(yearlyData,'yearl data is showing');

        const weeklyData = await getWeeklySalesReport()
        console.log(weeklyData,'weekly report is showing');

        const dailyData = await getDailySalesReport()
        console.log(dailyData,'dailt report is showing');


        res.render('dashboard',{orderCount:totalDeliveredOrders,totalRevenue:totalDeliveredCost,totalUserCount,productCount,categoryCount,yearlyData,monthlyData,weeklyData,dailyData})
    } catch (error) {
        console.log(error,'ADMIN SALES REPORT PAGE GET')
    }
}



  