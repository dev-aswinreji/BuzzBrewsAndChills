import express from 'express'

import { user_authentication } from '../../../middleware/user-auth.mjs';

import { user_profileGet } from '../../../controller/user/user-profile/user-profile.mjs';
import { user_updateProfileGet, user_updateProfilePost } from '../../../controller/user/user-profile/update-profile.mjs';

import { user_setNewPasswordGet, user_setNewPasswordPost } from '../../../controller/user/user-profile/set-new-password.mjs';

import { user_addressGet } from '../../../controller/user/user-profile/address.mjs';
import { user_addAddressGet, user_addAddressPost } from '../../../controller/user/user-profile/add-address.mjs';
import { user_editAddressGet, user_editAddressPost } from '../../../controller/user/user-profile/edit-address.mjs';
import { user_addressDeleteDelete } from '../../../controller/user/user-profile/delete-address.mjs';
import { user_updateDefaultAddressGet } from '../../../controller/user/user-profile/update-default-address.mjs';

const userProfileRoute = express.Router()

userProfileRoute.get('/user-profile', user_authentication, user_profileGet)

userProfileRoute.get('/update-profile', user_authentication, user_updateProfileGet)
userProfileRoute.post('/update-profile', user_authentication, user_updateProfilePost)

userProfileRoute.get('/address', user_authentication, user_addressGet)
userProfileRoute.post('/address', user_authentication, user_addAddressPost)

userProfileRoute.get('/add-address', user_authentication, user_addAddressGet)
userProfileRoute.post('/add-address', user_authentication, user_addAddressPost)

userProfileRoute.get('/edit-address', user_authentication, user_editAddressGet)
userProfileRoute.post('/edit-address', user_authentication, user_editAddressPost)

userProfileRoute.delete('/delete-address', user_authentication, user_addressDeleteDelete)

userProfileRoute.get('/update-default-address', user_authentication, user_updateDefaultAddressGet)

userProfileRoute.get('/set-new-password', user_authentication, user_setNewPasswordGet)
userProfileRoute.post('/set-new-password', user_authentication, user_setNewPasswordPost)


export default userProfileRoute
