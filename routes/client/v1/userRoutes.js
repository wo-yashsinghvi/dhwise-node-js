/**
 * userRoutes.js
 * @description :: CRUD API routes for user
 */

const express = require('express');
const router = express.Router();
const userController = require('../../../controller/client/v1/userController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/client/api/v1/user/me').get(auth(PLATFORM.CLIENT),userController.getLoggedInUserInfo);
router.route('/client/api/v1/user/change-password').put(auth(PLATFORM.CLIENT),userController.changePassword);
router.route('/client/api/v1/user/update-profile').put(auth(PLATFORM.CLIENT),userController.updateProfile);

module.exports = router;
