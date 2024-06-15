import express from 'express'
import {user_contactGet, user_contactPost} from '../../../controller/user/contact/contact.mjs';

const routeHome = express.Router()
routeHome.get('/contact', user_contactGet)
routeHome.post('/contact-queries',user_contactPost)


export default routeHome

