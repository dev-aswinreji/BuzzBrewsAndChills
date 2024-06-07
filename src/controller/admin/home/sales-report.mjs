import moment from "moment";
import { findAllOrderSuccessFullOrderAmount } from "../../../data/order/find.mjs"
import { generateCSVReport } from "../../../middleware/csv-generator.mjs";
import { formatReportData } from "../../../middleware/format-report-data.mjs";
import { generatePDFReport } from "../../../middleware/pdf-generator.mjs";
import { generateReport } from "../../../data/sales-report/generate-report.mjs";
import { orderCollection } from "../../../model/order.mjs";


export const admin_salesReportGet = async (req, res) => {
    try {
        const order = await findAllOrderSuccessFullOrderAmount()
        console.log(order, 'order is showing');
        const orderCount = order.length
        let total = 0;
        for (const price of order) {
            total += price.totalPrice
        }
        const totalPrice = total.toFixed(2)
        const {startDate,endDate } = req.query
        console.log(req.query, 'req query is showuing');
        let period;
        period = req.query.period || 'daily'
        let reportData;
        console.log(period, 'period is showing');
        if (period) {
            reportData = await generateReport(period,startDate,endDate)
        } else {
            reportData = []
        }
        console.log(reportData, 'report data is showing');
        // order.reduce((acc,curr)=>acc+curr)
        // console.log(order.length);
        // console.log(orderCount,'order count is showing');
        // const or = await orderCollection.deleteMany({})
        // console.log(or,'oru dinam');
        res.render('sales-report', { orderCount, totalPrice, reportData, period })
    } catch (error) {
        console.log(error, 'ADMIN SALES REPORT PAGE GET')
    }

}


export const admin_salesReportDownloadGet = async (req, res) => {
    const period = req.params.period
    try {
        console.log(period, 'period is showing');
        const reportData = await generateReport(period);
        console.log(reportData, 'reported data is success');
        if (req.query.download) {

            const formattedData = formatReportData(reportData);
            console.log(formattedData, 'formatted data is success');
            if (req.query.format === 'csv') {
                const csv = generateCSVReport(formattedData);
                res.header('Content-Type', 'text/csv');
                res.attachment(`${period}-report-${moment().format('YYYY-MM-DD')}.csv`);
                return res.send(csv);
            } else if (req.query.format === 'pdf') {
                const pdfBuffer = await generatePDFReport(formattedData, period);
                res.header('Content-Type', 'application/pdf');
                res.attachment(`${period}-report-${moment().format('YYYY-MM-DD')}.pdf`);
                return res.send(pdfBuffer);
            } else {
                res.status(400).send('Invalid format specified');
            }
        }

    } catch (error) {
        res.status(500).send("Error generating report: " + error.message);
    }
}