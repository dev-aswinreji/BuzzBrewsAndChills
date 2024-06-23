import express from 'express'

import { user_aboutGet } from '../../../controller/user/about/about.mjs';

const aboutRoute = express.Router()

aboutRoute.get('/about', user_aboutGet)

export default aboutRoute

