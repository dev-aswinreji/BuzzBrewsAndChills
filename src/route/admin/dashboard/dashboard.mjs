import express from "express";

import {admin_authentication} from "../../../middleware/admin-auth.mjs";

import {admin_dashboardGet} from "../../../controller/admin/dashboard/dashboard.mjs";

const dashboardRoute = express.Router()

dashboardRoute.get('/dashboard',admin_authentication, admin_dashboardGet)

export default dashboardRoute

