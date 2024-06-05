import moment from 'moment';
import mongoose from 'mongoose';
import fs from 'fs';
import PDFDocument from 'pdfkit';
import { createObjectCsvWriter } from 'csv-writer';
import { orderCollection } from './src/model/order.mjs';

async function generateReport() {
    try {
        // Fetch all orders
        const orders = await orderCollection.find().lean();

        // Initialize report data
        const report = {
            totalRevenue: 0,
            totalOrders: 0,
            daily: {},
            weekly: {},
            monthly: {},
            yearly: {}
        };

        // Process each order
        orders.forEach(order => {
            // Calculate total revenue
            report.totalRevenue += order.totalPrice;
            report.totalOrders += 1;

            // Order date in moment format
            const orderDate = moment(order.orderDate, "YYYY/MM/DD");

            // Daily report
            const day = orderDate.format("YYYY-MM-DD");
            if (!report.daily[day]) {
                report.daily[day] = { revenue: 0, orders: 0 };
            }
            report.daily[day].revenue += order.totalPrice;
            report.daily[day].orders += 1;

            // Weekly report
            const week = orderDate.format("YYYY-WW");
            if (!report.weekly[week]) {
                report.weekly[week] = { revenue: 0, orders: 0 };
            }
            report.weekly[week].revenue += order.totalPrice;
            report.weekly[week].orders += 1;

            // Monthly report
            const month = orderDate.format("YYYY-MM");
            if (!report.monthly[month]) {
                report.monthly[month] = { revenue: 0, orders: 0 };
            }
            report.monthly[month].revenue += order.totalPrice;
            report.monthly[month].orders += 1;

            // Yearly report
            const year = orderDate.format("YYYY");
            if (!report.yearly[year]) {
                report.yearly[year] = { revenue: 0, orders: 0 };
            }
            report.yearly[year].revenue += order.totalPrice;
            report.yearly[year].orders += 1;
        });

        return report;
    } catch (error) {
        console.error("Error generating report:", error);
        throw error;
    }
}

function createPDF(report) {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream('report.pdf'));

    doc.fontSize(20).text('Report Summary', { align: 'center' });
    doc.moveDown();

    doc.fontSize(14).text(`Total Revenue: ₹${report.totalRevenue}`, { align: 'left' });
    doc.text(`Total Orders: ${report.totalOrders}`, { align: 'left' });
    doc.moveDown();

    doc.fontSize(16).text('Daily Report', { align: 'left' });
    for (const [date, data] of Object.entries(report.daily)) {
        doc.text(`${date}: ₹${data.revenue} from ${data.orders} orders`, { align: 'left' });
    }
    doc.moveDown();

    doc.fontSize(16).text('Weekly Report', { align: 'left' });
    for (const [week, data] of Object.entries(report.weekly)) {
        doc.text(`${week}: ₹${data.revenue} from ${data.orders} orders`, { align: 'left' });
    }
    doc.moveDown();

    doc.fontSize(16).text('Monthly Report', { align: 'left' });
    for (const [month, data] of Object.entries(report.monthly)) {
        doc.text(`${month}: ₹${data.revenue} from ${data.orders} orders`, { align: 'left' });
    }
    doc.moveDown();

    doc.fontSize(16).text('Yearly Report', { align: 'left' });
    for (const [year, data] of Object.entries(report.yearly)) {
        doc.text(`${year}: ₹${data.revenue} from ${data.orders} orders`, { align: 'left' });
    }

    doc.end();
}

async function createCSV(report) {
    const csvWriter = createObjectCsvWriter({
        path: 'report.csv',
        header: [
            { id: 'period', title: 'Period' },
            { id: 'revenue', title: 'Revenue' },
            { id: 'orders', title: 'Orders' }
        ]
    });

    const data = [];

    for (const [date, stats] of Object.entries(report.daily)) {
        data.push({ period: `Daily - ${date}`, revenue: stats.revenue, orders: stats.orders });
    }

    for (const [week, stats] of Object.entries(report.weekly)) {
        data.push({ period: `Weekly - ${week}`, revenue: stats.revenue, orders: stats.orders });
    }

    for (const [month, stats] of Object.entries(report.monthly)) {
        data.push({ period: `Monthly - ${month}`, revenue: stats.revenue, orders: stats.orders });
    }

    for (const [year, stats] of Object.entries(report.yearly)) {
        data.push({ period: `Yearly - ${year}`, revenue: stats.revenue, orders: stats.orders });
    }

    await csvWriter.writeRecords(data);
}

generateReport()
    .then(report => {
        console.log("Report:", report);
        createPDF(report);
        createCSV(report);
    })
    .catch(error => {
        console.error("Error:", error);
    });
