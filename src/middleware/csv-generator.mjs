import { Parser } from 'json2csv';

export function generateCSVReport(data) {
  const fields = ['date', 'totalDeliveredOrders', 'totalDeliveredCost'];
  const parser = new Parser({ fields });
  const csv = parser.parse(data);
  return csv;
}
