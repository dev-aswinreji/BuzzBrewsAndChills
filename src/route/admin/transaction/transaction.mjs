

import exprees from "express";
import { transaction } from "../../../controller/admin/transaction/transaction.mjs";

const transactionAdminRoute = exprees.Router()

transactionAdminRoute.get('/transaction',transaction)

export default transactionAdminRoute
