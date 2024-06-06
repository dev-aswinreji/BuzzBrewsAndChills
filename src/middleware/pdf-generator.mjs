import PDFDocument from 'pdfkit';
import moment from 'moment';

export function generatePDFReport(data, period, customStartDate, customEndDate) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 30, size: 'A4' });
    let buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });

    // Calculate date range based on period
    let startDate, endDate;

    switch (period.toLowerCase()) {
      case 'daily':
        startDate = moment().startOf('day');
        endDate = moment().endOf('day');
        break;
      case 'weekly':
        startDate = moment().startOf('isoWeek');
        endDate = moment().endOf('isoWeek');
        break;
      case 'monthly':
        startDate = moment().startOf('month');
        endDate = moment().endOf('month');
        break;
      case 'custom':
        startDate = moment(customStartDate);
        endDate = moment(customEndDate);
        break;
      default:
        startDate = moment(data[0]?.date);
        endDate = moment();
    }

    const startDateString = startDate.format('YYYY/MM/DD');
    const endDateString = endDate.format('YYYY/MM/DD');

    // Header
    doc.fontSize(20).text('Sales Report', { align: 'center', underline: true });
    doc.moveDown(0.5);
    doc.fontSize(14).text(`${period.toUpperCase()} REPORT`, { align: 'center' });
    doc.fontSize(12).text(`From: ${startDateString} To: ${endDateString}`, { align: 'center' });
    doc.moveDown(1.5);

    // Table Header
    const tableTop = doc.y;
    const columnWidths = [60, 60, 70, 50, 50, 60, 70, 120];

    doc.fontSize(10).fillColor('white');
    doc.rect(30, tableTop, 540, 20).fill('black');

    const headerLabels = ['Date', 'Username', 'Product', 'Quantity', 'Price', 'Discount', 'Original Amount', 'Total Revenue'];
    let xPosition = 30;

    headerLabels.forEach((label, index) => {
      doc.fillColor('white').text(label, xPosition, tableTop, { width: columnWidths[index], align: 'center' });
      xPosition += columnWidths[index];
    });

    doc.moveTo(30, tableTop + 20).lineTo(570, tableTop + 20).stroke();

    // Table Rows
    let totalRevenue = 0;
    data.forEach((item, index) => {
      const rowTop = tableTop + 20 + (index * 20);
      const bgColor = index % 2 === 0 ? '#F9F9F9' : 'white';

      doc.fillColor(bgColor).rect(30, rowTop, 540, 20).fill();

      let xPosition = 30;

      const values = [
        moment(item.date).format('YYYY/MM/DD'),
        item.username || '',
        item.productName || '',
        item.quantity !== undefined ? item.quantity : 0,
        (item.price !== undefined ? item.price : 0).toFixed(2),
        (item.discount !== undefined ? item.discount : 0).toFixed(2),
        (item.originalAmount !== undefined ? item.originalAmount : 0).toFixed(2),
        (item.totalRevenue !== undefined ? item.totalRevenue : 0).toFixed(2),
      ];

      values.forEach((value, index) => {
        doc.fillColor('black').text(value, xPosition, rowTop, { width: columnWidths[index], align: 'center', lineBreak: false });
        xPosition += columnWidths[index];
      });

      totalRevenue += item.totalRevenue !== undefined ? item.totalRevenue : 0;
    });

    // Total Revenue
    doc.moveDown(2);
    const totalRevenueText = `Overall Revenue for the ${period.toUpperCase()}: $${totalRevenue.toFixed(2)}`;
    const totalRevenueX = (doc.page.width - doc.widthOfString(totalRevenueText)) / 2;
    doc.fontSize(12).fillColor('black').text(totalRevenueText, totalRevenueX, doc.y, { underline: true });

    // Footer
    doc.moveDown(2);
    const footerText = 'End of Report';
    const footerX = (doc.page.width - doc.widthOfString(footerText)) / 2;
    doc.fontSize(10).text(footerText, footerX, doc.y, { underline: true });

    doc.end();
  });
}
