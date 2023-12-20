/**
 * roleRoutes.js
 * @description :: CRUD API routes for role
 */

const express = require('express');
const router = express.Router();
const roleController = require('../../../controller/device/v1/roleController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/role/create').post(auth(PLATFORM.DEVICE),checkRolePermission,checkRolePermission,roleController.addRole);
router.route('/device/api/v1/role/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,checkRolePermission,roleController.bulkInsertRole);
router.route('/device/api/v1/role/list').post(auth(PLATFORM.DEVICE),checkRolePermission,checkRolePermission,roleController.findAllRole);
router.route('/device/api/v1/role/count').post(auth(PLATFORM.DEVICE),checkRolePermission,checkRolePermission,roleController.getRoleCount);
router.route('/device/api/v1/role/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,checkRolePermission,roleController.bulkUpdateRole);
router.route('/device/api/v1/role/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,checkRolePermission,roleController.softDeleteManyRole);
router.route('/device/api/v1/role/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,checkRolePermission,roleController.deleteManyRole);
router.route('/device/api/v1/role/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,checkRolePermission,roleController.softDeleteRole);
router.route('/device/api/v1/role/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,checkRolePermission,roleController.partialUpdateRole);
router.route('/device/api/v1/role/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,checkRolePermission,roleController.updateRole);    
router.route('/device/api/v1/role/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,checkRolePermission,roleController.getRole);
router.route('/device/api/v1/role/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,checkRolePermission,roleController.deleteRole);

module.exports = router;
