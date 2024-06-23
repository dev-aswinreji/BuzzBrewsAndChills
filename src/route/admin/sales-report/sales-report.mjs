import express from "express";

import {admin_authentication} from "../../../middleware/admin-auth.mjs";

import { admin_pdfFormat } from "../../../controller/admin/sales-report/pdf-format.mjs";
import { admin_salesReportDownloadGet, admin_salesReportGet } from "../../../controller/admin/sales-report/sales-report.mjs";

const salesReportRoute = express.Router()

salesReportRoute.get('/sales-report',admin_authentication,admin_salesReportGet)
salesReportRoute.get('/report/download/:period',admin_authentication,admin_salesReportDownloadGet)
salesReportRoute.get('/download-report',admin_authentication,admin_pdfFormat)

export default salesReportRoute
