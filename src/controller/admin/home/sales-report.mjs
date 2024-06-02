import {findAllOrderSuccessFullOrderAmount } from "../../../data/order/find.mjs"


export const admin_salesReportGet = async (req,res)=>{
    try {
        const order = await findAllOrderSuccessFullOrderAmount()
        console.log(order,'order is showing');
        const orderCount = order.length
        let total = 0 ;
        for (const price of order) {
            total += price.totalPrice
        }
        const totalPrice = total.toFixed(2)
        console.log(total,'total is showing');
        console.log(totalPrice,'total price is showing heh  ');
        // order.reduce((acc,curr)=>acc+curr)
        // console.log(order.length);
        // console.log(orderCount,'order count is showing');
        
        res.render('sales-report',{orderCount,totalPrice})
    } catch (error) {
        console.log(error,'ADMIN SALES REPORT PAGE GET')
    }
 
}