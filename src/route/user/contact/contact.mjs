import express from 'express'

import {user_contactGet, user_contactPost} from '../../../controller/user/contact/contact.mjs';

const contactRoute = express.Router()

contactRoute.get('/contact', user_contactGet)
contactRoute.post('/contact-queries',user_contactPost)

export default contactRoute

