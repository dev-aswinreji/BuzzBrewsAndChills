import PDFDocument from 'pdfkit';
import { generateReport } from '../../../data/sales-report/generate-report.mjs';

export const admin_pdfFormat = async (req, res) => {
    try {
        const { period, customStartDate, customEndDate } = req.query;
        const reportData = await generateReport(period, customStartDate, customEndDate);
        console.log(reportData, 'report data is showing successfully');
        console.log(reportData[0].products[0]);
        const doc = new PDFDocument();
        res.setHeader('Content-disposition', 'attachment; filename="sales_report.pdf"');
        res.setHeader('Content-type', 'application/pdf');
        doc.pipe(res);

        // Add title to the document
        doc.font('Helvetica-Bold')
            .fontSize(18)
            .text('Sales Report', { align: 'center', underline: true })
            .text(`${period}`)
            .text(`Total Revenue: Rs${reportData[0].totalRevenue.toFixed(2)}`, { align: 'right' })
            .moveDown();

        //'Original Amount' extracter orginal amount name 
        const table = {
            headers: [
                'Sl No', 'Username', 'Product Name','Price (Rs)', 'Quantity', 'Orginal Price (Rs)',
                'Coupon  Discount (%)', 'Grand Total (Rs)'
            ],
            rows: reportData[0].products.map((item, index) => [
                index + 1,
                item.username,
                item.productName,
                `${item.price.toFixed(2)}`,
                item.quantity,
                `${item.originalAmount.toFixed(2)}`,
                `${item.couponDiscount.toFixed(2)}`,
                `${item.totalPrice.toFixed(2)}`
            ])
        };

        // Generate the table in the PDF
        generateTable(doc, table);
        doc.end();
    } catch (error) {
        console.error('Error generating PDF report:', error);
        res.status(500).send('Error generating PDF report');
    }
};

// Function to generate table in PDF document
function generateTable(doc, table) {
    const startX = 50;
    const startY = 150;
    const rowHeight = 50;
    const headerHeight = 30;

    const colWidths = [30, 70, 70, 70, 60, 70,70, 80];  // Specify column widths
    const borderWidth = 1;

    // Draw table headers
    let xPos = startX;
    doc.font('Helvetica-Bold').fontSize(12).fillColor('#333');
    table.headers.forEach((header, i) => {
        doc.rect(xPos, startY, colWidths[i], rowHeight).fillAndStroke('#f2f2f2', '#000');
        doc.fillColor('#000').text(header, xPos + 5, startY + 10, { width: colWidths[i] - 10, align: 'center' });
        xPos += colWidths[i];
    });

    // Draw table rows
    doc.font('Helvetica').fontSize(10);
    table.rows.forEach((row, rowIndex) => {
        const yPos = startY + (rowIndex + 1) * rowHeight;

        // Alternate background color for rows
        const fillColor = rowIndex % 2 === 0 ? '#ffffff' : '#f2f2f2';

        xPos = startX;
        row.forEach((cell, colIndex) => {
            const cellWidth = colWidths[colIndex];
            doc.rect(xPos, yPos, cellWidth, rowHeight).fillAndStroke(fillColor, '#000');
            doc.fillColor('#000').text(cell, xPos + 5, yPos + 10, { width: cellWidth - 10, align: 'left' });
            xPos += cellWidth;
        });
    });
}
