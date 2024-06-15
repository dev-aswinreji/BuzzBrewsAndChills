import express from 'express'

import {user_authentication} from '../../../middleware/user-auth.mjs';

import { user_walletGet } from '../../../controller/user/wallet/wallet.mjs';
import { user_walletPaymentGet } from '../../../controller/user/wallet/wallet-payment.mjs';

const walletRoute = express.Router()

walletRoute.get('/wallet',user_authentication,user_walletGet)
walletRoute.get('/wallet-payment',user_authentication,user_walletPaymentGet)

export default walletRoute
