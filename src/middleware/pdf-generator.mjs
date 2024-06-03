import PDFDocument from 'pdfkit';

export function generatePDFReport(data) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    let buffers = [];
    
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });
    
    doc.fontSize(12).text('Sales Report', { align: 'center' });

    data.forEach(item => {
      doc.text(`Date: ${item.date}`);
      doc.text(`Total Delivered Orders: ${item.totalDeliveredOrders}`);
      doc.text(`Total Delivered Cost: ${item.totalDeliveredCost}`);
      doc.moveDown();
    });

    doc.end();
  });
}
