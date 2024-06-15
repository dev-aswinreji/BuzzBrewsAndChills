import express from 'express'
import {user_profileGet} from '../../../controller/user/user-profile/user-profile.mjs';
import {user_setNewPasswordGet, user_setNewPasswordPost} from '../../../controller/user/user-profile/set-new-password.mjs';
import {user_editAddressGet, user_editAddressPost} from '../../../controller/user/user-profile/edit-address.mjs';
import {user_updateProfileGet, user_updateProfilePost} from '../../../controller/user/user-profile/update-profile.mjs';

import {user_addressGet} from '../../../controller/user/user-profile/address.mjs';
import {user_addAddressGet, user_addAddressPost} from '../../../controller/user/user-profile/add-address.mjs';
import {user_addressDeleteDelete} from '../../../controller/user/user-profile/delete-address.mjs';
import { user_updateDefaultAddressGet } from '../../../controller/user/user-profile/update-default-address.mjs';
const routeHome = express.Router()
import {user_authentication} from '../../../middleware/user-auth.mjs';




routeHome.get('/user-profile', user_authentication, user_profileGet)

routeHome.get('/update-profile', user_authentication, user_updateProfileGet)
routeHome.post('/update-profile', user_authentication, user_updateProfilePost)

routeHome.get('/address', user_authentication, user_addressGet)
routeHome.post('/address',user_authentication, user_addAddressPost)

routeHome.get('/add-address', user_authentication, user_addAddressGet)
routeHome.post('/add-address', user_authentication, user_addAddressPost)

routeHome.get('/edit-address', user_authentication, user_editAddressGet)
routeHome.post('/edit-address', user_authentication, user_editAddressPost)

routeHome.delete('/delete-address',user_authentication, user_addressDeleteDelete)

routeHome.get('/update-default-address',user_authentication, user_updateDefaultAddressGet)

routeHome.get('/set-new-password', user_authentication, user_setNewPasswordGet)
routeHome.post('/set-new-password', user_authentication, user_setNewPasswordPost)


export default routeHome
