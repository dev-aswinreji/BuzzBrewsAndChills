import express from 'express'
import { user_aboutGet } from '../../../controller/user/about/about.mjs';

const routeHome = express.Router()
routeHome.get('/about', user_aboutGet)

export default routeHome

