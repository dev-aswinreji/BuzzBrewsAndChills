import PDFDocument from 'pdfkit';
import moment from 'moment';

export function generatePDFReport(data, period) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 30, size: 'A4' });
    let buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });

    // Header
    doc.fontSize(20).text('Sales Report', { align: 'center', underline: true });
    doc.moveDown(0.5);
    doc.fontSize(14).text(`${period.toUpperCase()} REPORT`, { align: 'center' });
    doc.moveDown(1.5);

    // Table Header
    const tableTop = doc.y;
    const itemWidths = [60, 100, 100, 60, 60, 60, 80, 80];

    doc.fontSize(10)
      .fillColor('white')
      .rect(30, tableTop - 2, 540, 20)
      .fill('black');

    doc.fillColor('white')
      .text('Date', 35, tableTop, { width: itemWidths[0], align: 'left' })
      .text('Username', 95, tableTop, { width: itemWidths[1], align: 'left' })
      .text('Product', 195, tableTop, { width: itemWidths[2], align: 'left' })
      .text('Quantity', 295, tableTop, { width: itemWidths[3], align: 'right' })
      .text('Price', 355, tableTop, { width: itemWidths[4], align: 'right' })
      .text('Discount', 415, tableTop, { width: itemWidths[5], align: 'right' })
      .text('Original Amount', 475, tableTop, { width: itemWidths[6], align: 'right' })
      .text('Total Revenue', 555, tableTop, { width: itemWidths[7], align: 'right' });

    doc.moveTo(30, doc.y + 5).lineTo(570, doc.y + 5).stroke().moveDown(0.5);

    // Table Rows
    let totalRevenue = 0;
    data.forEach((item, index) => {
      const rowTop = tableTop + 25 + (index * 20);
      const bgColor = index % 2 === 0 ? '#F9F9F9' : 'white';
      doc.fillColor(bgColor)
        .rect(30, rowTop - 2, 540, 20)
        .fill();

      doc.fillColor('black')
        .text(moment(item.date).format('YYYY/MM/DD'), 35, rowTop, { width: itemWidths[0], align: 'left' })
        .text(item.username || '', 95, rowTop, { width: itemWidths[1], align: 'left' })
        .text(item.productName || '', 195, rowTop, { width: itemWidths[2], align: 'left' })
        .text(item.quantity !== undefined ? item.quantity : 0, 295, rowTop, { width: itemWidths[3], align: 'right' })
        .text((item.price !== undefined ? item.price : 0).toFixed(2), 355, rowTop, { width: itemWidths[4], align: 'right' })
        .text((item.discount !== undefined ? item.discount : 0).toFixed(2), 415, rowTop, { width: itemWidths[5], align: 'right' })
        .text((item.originalAmount !== undefined ? item.originalAmount : 0).toFixed(2), 475, rowTop, { width: itemWidths[6], align: 'right' })
        .text((item.totalRevenue !== undefined ? item.totalRevenue : 0).toFixed(2), 555, rowTop, { width: itemWidths[7], align: 'right' });

      totalRevenue += item.totalRevenue !== undefined ? item.totalRevenue : 0;
    });

    // Summary
    doc.moveDown(2);
    doc.fontSize(12)
      .fillColor('black')
      .text(`Total Revenue for the ${period.toUpperCase()}: $${totalRevenue.toFixed(2)}`, { align: 'center', underline: true });

    doc.moveDown(2);
    doc.fontSize(10).text('End of Report', { align: 'center', underline: true });

    doc.end();
  });
}
