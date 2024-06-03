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
        console.log(total, 'total is showing');
        console.log(totalPrice, 'total price is showing heh  ');
        // order.reduce((acc,curr)=>acc+curr)
        // console.log(order.length);
        // console.log(orderCount,'order count is showing');
        // const or = await orderCollection.deleteMany({})
        // console.log(or,'oru dinam');
        res.render('sales-report', { orderCount, totalPrice })
    } catch (error) {
        console.log(error, 'ADMIN SALES REPORT PAGE GET')
    }

}

export const admin_salesReportDownloadGet = async (req, res) => {
    const period = req.params.period
    try {
        const reportData = await generateReport(period);
        const formattedData = formatReportData(reportData);

        if (req.query.format === 'csv') {
            const csv = generateCSVReport(formattedData);
            res.header('Content-Type', 'text/csv');
            res.attachment(`${period}-report-${moment().format('YYYY-MM-DD')}.csv`);
            return res.send(csv);
        } else if (req.query.format === 'pdf') {
            const pdfBuffer = await generatePDFReport(formattedData);
            res.header('Content-Type', 'application/pdf');
            res.attachment(`${period}-report-${moment().format('YYYY-MM-DD')}.pdf`);
            return res.send(pdfBuffer);
        } else {
            res.status(400).send('Invalid format specified');
        }
    } catch (error) {
        res.status(500).send("Error generating report: " + error.message);
    }
}