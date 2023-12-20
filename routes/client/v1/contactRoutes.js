/**
 * contactRoutes.js
 * @description :: CRUD API routes for contact
 */

const express = require('express');
const router = express.Router();
const contactController = require('../../../controller/client/v1/contactController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/contact/create').post(auth(PLATFORM.CLIENT),checkRolePermission,contactController.addContact);
router.route('/client/api/v1/contact/list').post(auth(PLATFORM.CLIENT),checkRolePermission,contactController.findAllContact);
router.route('/client/api/v1/contact/count').post(auth(PLATFORM.CLIENT),checkRolePermission,contactController.getContactCount);
router.route('/client/api/v1/contact/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,contactController.getContact);
router.route('/client/api/v1/contact/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,contactController.updateContact);    
router.route('/client/api/v1/contact/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,contactController.partialUpdateContact);
router.route('/client/api/v1/contact/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,contactController.softDeleteContact);
router.route('/client/api/v1/contact/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,contactController.softDeleteManyContact);
router.route('/client/api/v1/contact/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,contactController.bulkInsertContact);
router.route('/client/api/v1/contact/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,contactController.bulkUpdateContact);
router.route('/client/api/v1/contact/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,contactController.deleteContact);
router.route('/client/api/v1/contact/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,contactController.deleteManyContact);

module.exports = router;
