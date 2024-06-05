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
    const columnWidths = [80, 120, 120, 80, 80, 80, 120, 120];

    doc.fontSize(10).fillColor('white');
    doc.rect(30, tableTop, 570, 20).fill('black');

    const headerLabels = ['Date', 'Username', 'Product', 'Quantity', 'Price', 'Discount', 'Original Amount', 'Total Revenue'];
    let xPosition = 30;

    headerLabels.forEach((label, index) => {
      doc.fillColor('white').text(label, xPosition, tableTop, { width: columnWidths[index], align: 'left' });
      xPosition += columnWidths[index];
    });

    doc.moveTo(30, tableTop + 20).lineTo(600, tableTop + 20).stroke();

    // Table Rows
    let totalRevenue = 0;
    data.forEach((item, index) => {
      const rowTop = tableTop + 20 + (index * 20);
      const bgColor = index % 2 === 0 ? '#F9F9F9' : 'white';

      doc.fillColor(bgColor).rect(30, rowTop, 570, 20).fill();

      let xPosition = 30;

      Object.values(item).forEach((value, index) => {
        const text = index === 0 ? moment(value).format('YYYY/MM/DD') : value.toString();
        doc.fillColor('black').text(text, xPosition, rowTop, { width: columnWidths[index], align: 'left', lineBreak: false });
        xPosition += columnWidths[index];
      });

      totalRevenue += (item.price - item.discount) * item.quantity || 0; // Adjusted calculation for total revenue after discount
    });

    // Total Revenue
    const totalRevenueText = `Total Revenue for the ${period.toUpperCase()}: $${totalRevenue.toFixed(2)}`;
    const totalRevenueWidth = doc.widthOfString(totalRevenueText);
    const totalRevenueX = (doc.page.width - totalRevenueWidth) / 2;

    doc.moveDown().fontSize(12).text(totalRevenueText, totalRevenueX, doc.y, { align: 'center' });

    // Footer
    doc.moveDown(2);
    doc.fontSize(10).text('End of Report', { align: 'center', underline: true });

    doc.end();
  });
}
